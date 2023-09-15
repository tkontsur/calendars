import cn from 'classnames';
import PropTypes from 'prop-types';
import { hasMovingHoliday, getMovigHoliday } from '../data/dataSelectors';
import CalendarPage from './CalendarPage';
import { Moving } from './HolidayTypes';
import './day.css';

const Day = props => {
    const { day, showMonth, inverted } = props;
    const targetDayObject = inverted ? day : day.add(13, 'd');
    const targetDate = targetDayObject.format('MM-DD');
    const dayOfWeek = day.day();

    const getHoliday = () => {
        const moving = getMovigHoliday(targetDate);
        if (moving) {
            return (<Moving date={day} name={moving} inverted={inverted} />);
        }

        return (<div></div>);
    }

    return (<>
        {showMonth && <div className='month-title'>{day.format('MMMM')}</div>}
        <div className={cn('day', { 'red': dayOfWeek === 0 })}>
            <CalendarPage 
                day={day} 
                crossed={inverted && hasMovingHoliday(targetDate)} 
            />
            <div className='holiday'>
                {getHoliday(targetDate)}
            </div>
        </div>
    </>);
};

Day.propTypes = {
    day: PropTypes.object.isRequired,
    showMonth: PropTypes.bool,
    inverted: PropTypes.bool
};

export default Day;
