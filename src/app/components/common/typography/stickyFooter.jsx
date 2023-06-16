import PropTypes from "prop-types";

const StickyFooter = ({ body, footer }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">{body}</div>
      {footer}
    </div>
  );
};

StickyFooter.propTypes = {
  body: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default StickyFooter;
