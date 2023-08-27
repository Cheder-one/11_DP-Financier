import PropTypes from "prop-types";
import { IconContext } from "react-icons";

const IconProvider = ({
  value,
  defaultValue,
  iconClass,
  squareSize
}) => {
  return (
    <div
      className={
        iconClass
          ? iconClass +
            " flex justify-center cursor-pointer border rounded w-fit"
          : ""
      }
    >
      <IconContext.Provider value={{ size: squareSize }}>
        {value || defaultValue}
      </IconContext.Provider>
    </div>
  );
};

IconProvider.propTypes = {
  iconClass: PropTypes.string,
  squareSize: PropTypes.string,
  value: PropTypes.node,
  defaultValue: PropTypes.node
};

export default IconProvider;
