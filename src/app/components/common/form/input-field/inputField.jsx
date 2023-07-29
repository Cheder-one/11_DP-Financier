import PropTypes from "prop-types";
import { useRef } from "react";
import { useFocus } from "../../../../hooks";

const InputField = ({
  name,
  value,
  children,
  placeholder,
  inputClass,
  containerClass,
  onChange
}) => {
  const inputRef = useRef();

  useFocus(inputRef);

  const handleChange = ({ target }) => {
    onChange({ target });
  };

  return (
    <div className={containerClass}>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        className={inputClass}
        onChange={handleChange}
        ref={inputRef}
      />
      <div>{children}</div>
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  containerClass: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired
};

export default InputField;
