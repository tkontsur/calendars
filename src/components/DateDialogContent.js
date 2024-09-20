import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import Day from './Day';
import uk from 'date-fns/locale/uk';
import 'react-datepicker/dist/react-datepicker.css';
import './DayDialogContent.css';

registerLocale('uk', uk);

const DateDialogContent = ({ onClose, onSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [name, setName] = useState('');
    const [propose, setPropose] = useState(false);
    const dayjsDate = new dayjs(selectedDate);

    return (
        <div className='add-date-content'>
            <div>Стара дата</div>
            <ReactDatePicker
                locale='uk'
                selected={selectedDate} 
                onChange={date => setSelectedDate(date)} 
                dateFormat='dd MMMM'
            />
            {propose && <label>
                Свято <br/>
                <input type='text' maxLength={50} width={50} />
            </label>}
            <Day day={dayjsDate} inverted />
            <div className='controls'>
                <button name='close' onClick={onClose}>Закрити</button>
                <button 
                    name='add' 
                    onClick={() => {
                        onSelect({ dayjsDate, name });
                        onClose();
                    }}>
                        Додати
                </button>
            </div>
        </div>
    );
}

DateDialogContent.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func
};

export default DateDialogContent;
