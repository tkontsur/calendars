import { PropTypes } from 'prop-types';
const OtherDate = ({ showDialog }) => (
    <div role="button" className="control-item" onClick={showDialog}> + </div>
);

OtherDate.propTypes = {
    showDialog: PropTypes.func.isRequired
};

export default OtherDate;
