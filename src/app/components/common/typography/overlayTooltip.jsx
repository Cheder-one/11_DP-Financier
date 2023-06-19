import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const OverlayTooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = () => {
    const { current } = ref;

    if (current.offsetWidth < current.scrollWidth) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const tooltip = <Tooltip id="tooltip">{text || children}</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={tooltip} show={showTooltip}>
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text || children}
      </div>
    </OverlayTrigger>
  );
};

OverlayTooltip.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired
  ])
};

OverlayTooltip.propTypes = (props, componentName) => {
  if (!props.text && !props.children) {
    return new Error(
      `One of 'text' or 'children' is required in '${componentName}'.`
    );
  }

  if (props.text && props.children) {
    return new Error(
      `Only one of 'text' or 'children' is allowed in '${componentName}'.`
    );
  }
};

export default OverlayTooltip;
