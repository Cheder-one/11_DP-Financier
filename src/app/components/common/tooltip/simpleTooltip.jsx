import PropTypes from "prop-types";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const SimpleTooltip = ({ id, text, children, drop, trigger }) => {
  const renderTooltip = (props) => (
    <Tooltip id={id} {...props}>
      {text}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={drop}
      trigger={trigger}
      delay={{ show: 150, hide: 250 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
};

SimpleTooltip.defaultProps = {
  id: "button-tooltip",
  drop: "bottom",
  trigger: "hover"
};

SimpleTooltip.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  drop: PropTypes.string,
  trigger: PropTypes.string
};

export default SimpleTooltip;
