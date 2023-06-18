import PropTypes from "prop-types";

const HeaderContainer = ({ children, className, style }) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center w-100 ${className}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

HeaderContainer.defaultProps = {
  className: "mx-5"
};

HeaderContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  style: PropTypes.object
};

export default HeaderContainer;
