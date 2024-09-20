import cn from 'classnames';
import PropTypes from 'prop-types';
import { getMovigHoliday } from '../data/dataSelectors';
import CalendarPage from './CalendarPage';
import { Moving } from './HolidayTypes';
import './Day.css';

const Day = props => {
    const { day, showMonth, inverted } = props;
    const targetDayObject = inverted ? day.add(-13, 'd') : day.add(13, 'd');
    const targetDate = targetDayObject.format('MM-DD');
    const dayOfWeek = day.day();

    const getHoliday = () => {
        const moving = getMovigHoliday(inverted ? day.format('MM-DD') : targetDate);
        if (moving) {
            return (<Moving date={inverted ? targetDayObject : day} name={moving} inverted={inverted} />);
        }

        if (inverted) {
            return (<Moving date={targetDayObject} inverted />);
        }

        return (<div></div>);
    }

    return (<>
        {showMonth && <div className='month-title'>{day.format('MMMM')}</div>}
        <div className={cn('day', { 'red': dayOfWeek === 0 })}>
            <CalendarPage 
                day={day} 
                crossed={inverted} 
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
