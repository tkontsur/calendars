import PropTypes from 'prop-types';
import Day from './Day';


const Month = (props) => {
    const { start, end, inverted } = props;
    
    const days = [];
    let d = start;

    while (d.isBefore(end)) {
        days.push(d);
        d = d.add(1, 'd');
    }
    
    return (<div className='month'>
        {days.map((d, i) => 
            <Day 
                key={`${d.toString()}`}
                day={d} 
                index={i} 
                inverted={inverted} 
            />)}
    </div>);
}

Month.propTypes = {
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    inverted: PropTypes.bool
};

export default Month;