import PropTypes from 'prop-types';
import { PiArrowFatRightThin, PiArrowFatLeftThin  }from 'react-icons/pi';
import CalendarPage from '../CalendarPage';
import './Moving.css';

const Moving = props => {
    const { date, name, inverted } = props;
    const targetDate = inverted ? date : date.add(13, 'd');

    return (
        <div className='movable'>
            {inverted ? <PiArrowFatRightThin /> : <PiArrowFatLeftThin />}
            <CalendarPage day={targetDate} moved crossed={!inverted} />
            <div className='title'>{name}</div>
        </div>
    );
}

Moving.propTypes = {
    date: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    inverted: PropTypes.bool
}

export default Moving;
