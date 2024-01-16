import dayjs from 'dayjs';
import ukLocale from 'dayjs/locale/uk';
import './App.css';
import { useState, useTransition, useEffect } from 'react';
import ReactModal from 'react-modal';
import { hasHoliday } from './data/dataSelectors';
import Day from './components/Day';
import TGIcon from './components/controls/TGIcon';
import OtherDate from './components/controls/OtherDate';
import DateDialogContent from './components/DateDialogContent';

ReactModal.setAppElement('#root');

function App() {
  dayjs.locale(ukLocale);

  const [inverted, setInverted] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const start = dayjs();
  const [end, setEnd] = useState(start.add(1, 'year'));
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const loadMore = (nextEnd) => {
    startTransition(() => {
      if (nextEnd) {
        setEnd(nextEnd);
      }

      const days = [];
      let d = start;

      while (d.isBefore(end)) {
        days.push(d);
        d = d.add(1, 'd');
      }

      setItems(days);
    });
  };

  useEffect(() => {
    const diff = end.diff(start, 'd');

    if (items.length < diff) {
      loadMore();
    }
  }, [items.length, start, end]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Новий календар українських свят</h1>
      </header>
      <main>
        <div className='month'>
          {items
            .filter(d => showEmpty || hasHoliday(d))
            .map((d, i, days) =>
              <Day 
                key={`${d.toString()}`}
                day={d} 
                showMonth={i === 0 || days[i - 1].month() !== d.month()} 
                inverted={inverted} 
              />)}
        </div>
      </main>
      <footer>
        <div className='control-panel'>
          <TGIcon />
          <OtherDate showDialog={() => setShowAddDialog(true)}/>
        </div>
      </footer>
      <ReactModal 
          isOpen={showAddDialog} 
          className='add-modal' 
          overlayClassName='add-modal-ovrlay'>
        <DateDialogContent onClose={() => setShowAddDialog(false)} onSelect={(date) => setItems([...items, date])}/>
      </ReactModal>
    </div>
  );
}

export default App;
