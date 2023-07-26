import PropTypes from "prop-types";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

const Multiselect = ({ name, value, options, onChange, selectClass }) => {
  const handleChange = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: selectedOptions
      }
    });
  };

  return (
    <CreatableSelect
      isMulti
      options={options}
      value={value}
      className={selectClass ? selectClass + " relative z-10" : "relative z-10"}
      onChange={handleChange}
    />
  );
};

Multiselect.defaultProps = {
  // selectClass: "relative z-10"
};

Multiselect.propTypes = {
  selectClass: PropTypes.string
};

export default Multiselect;
