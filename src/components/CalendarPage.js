import PropTypes from 'prop-types';
import cn from 'classnames';

const CalendarPage = props => {
    const { day, crossed, moved } = props;
    const date = day.date();
    const name = day.format(moved ? 'MMM' : 'dd');

    return (
        <div className={cn('date', { crossed })}>
            <div className='date'>{date}</div>
            <div className='name'>{name}</div>
        </div>
    );
};

CalendarPage.propTypes = {
    day: PropTypes.object.isRequired,
    crossed: PropTypes.bool,
    moved: PropTypes.bool
};

export default CalendarPage;
