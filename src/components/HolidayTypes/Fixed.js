import PropTypes from 'prop-types';

const Fixed = props => {
    const { name } = props;

    return (<div className='fixed'>{name}</div>);
}

Fixed.propTypes = {
    name: PropTypes.string
}

export default Fixed;
