import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const OverlayTooltip = ({ text }) => {
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

  const tooltip = <Tooltip id="tooltip">{text}</Tooltip>;

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={tooltip}
      show={showTooltip}
      // rootClose={true}
      // trigger="hover"
    >
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
        {text}
      </div>
    </OverlayTrigger>
  );
};

OverlayTooltip.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired
  ]).isRequired
};

export default OverlayTooltip;
