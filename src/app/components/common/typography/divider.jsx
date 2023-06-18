import PropTypes from "prop-types";

const Divider = ({ className }) => {
  return <hr className={`m-0 ${className}`} />;
};

Divider.propTypes = {
  className: PropTypes.string
};

export default Divider;
