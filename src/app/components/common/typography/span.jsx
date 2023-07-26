import PropTypes from "prop-types";

const Span = ({ text, className }) => {
  return <span className={className}>{text}</span>;
};

Span.defaultProps = {
  className: "text-[#212529]"
};

Span.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Span;
