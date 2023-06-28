import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const Loader = ({ text, className }) => {
  return (
    <div className={`${className}}`}>
      <Spinner
        size="sm"
        role="status"
        variant="primary mr-2"
        animation="border"
      />
      <span className="visually mr-2">{text}</span>
    </div>
  );
};

Loader.defaultProps = {
  text: "Loading..."
};

Loader.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default Loader;
