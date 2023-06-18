import PropTypes from "prop-types";

const ManualContainer = ({ children, className }) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center w-100 ${className}`}
    >
      {children}
    </div>
  );
};

ManualContainer.defaultProps = {
  className: "mx-5"
};

ManualContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};

export default ManualContainer;
