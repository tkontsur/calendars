import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import './DayDialogContent.css';

const DateDialogContent = ({ onClose, onSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new dayjs());
    const [name, setName] = useState('');

    return (
        <div className='add-date-content'>
            <ReactDatePicker />
            <label>
                Свято
                <input type='text' maxLength={50} width={50} />
            </label>
            <hr/>
            <div className='control-panel'>
                <button 
                    name='add' 
                    onClick={() => {
                        onSelect(selectedDate);
                        onClose();
                    }}>
                        Додати
                </button>
                <button name='close' onClick={onClose}>Закрити</button>
            </div>
        </div>
    );
}

DateDialogContent.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default DateDialogContent;
