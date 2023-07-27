import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
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

export default InputField;
