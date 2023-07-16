import PropTypes from "prop-types";

const ContentBetween = ({ children, className }) => {
  return <div className={`flex justify-between ${className}`}>{children}</div>;
};

ContentBetween.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string
};

export default ContentBetween;
