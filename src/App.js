import dayjs from 'dayjs';
import ukLocale from 'dayjs/locale/uk';
import logo from './logo.svg';
import './App.css';
import { useState, useTransition, useRef, useEffect } from 'react';
import { hasHoliday } from './data/dataSelectors';
import Day from './components/Day';

function App() {
  dayjs.locale(ukLocale);

  const observerTarget = useRef(null);
  const [inverted, setInverted] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const start = dayjs();
  const [end, setEnd] = useState(start.add(1, 'year'));
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

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
  }, [end])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && start.add(1, 'y').isAfter(end)) {
          setEnd(end.add(1, 'month'));
        }
      },
      { threshold: 1 }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    
  
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

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
        <div ref={observerTarget}></div>
      </main>
    </div>
  );
}

export default App;
