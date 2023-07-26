import PropTypes from "prop-types";

const InputField = ({
  name,
  value,
  placeholder,
  inputClass,
  containerClass,
  onChange
}) => {
  const handleChange = ({ target }) => {
    onChange(target);
  };

  return (
    <div className={containerClass}>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        className="rounded-lg w-full border-2 px-1.5 focus:outline-none focus:border-blue-500"
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
