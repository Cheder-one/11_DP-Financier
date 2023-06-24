import PropTypes from "prop-types";

const HeaderContainer = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center w-full ${className}`}
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
  className: PropTypes.string
};

export default HeaderContainer;
