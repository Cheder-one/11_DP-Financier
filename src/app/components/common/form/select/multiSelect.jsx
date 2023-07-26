import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";

import { Span } from "../../typography";
import { getNanoId } from "../../../../utils";
import { useState } from "react";

const Multiselect = ({
  name,
  value,
  options,
  onChange,
  selectClass,
  error
}) => {
  const [isValid, setIsValid] = useState(false);

  const getCategoryId = () => {
    return "category-id-" + getNanoId();
  };

  const toInitFormat = (items) => {
    return items.map(({ label, value, __isNew__ }) => ({
      id: __isNew__ ? getCategoryId() : value,
      name: label
    }));
  };

  const handleChange = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: toInitFormat(selectedOptions)
      }
    });
  };

  const getClassName = () => {
    return selectClass ? selectClass + " relative z-10" : "relative z-10";
  };

  return (
    <>
      <CreatableSelect
        isMulti
        required
        value={value}
        options={options}
        placeholder={<Span text={"Категория"} />}
        className={getClassName()}
        onChange={handleChange}
      />
      {error && (
        <div className="text-red-500 mt-1 text-sm">
          Выберите хотя бы одну категорию
        </div>
      )}
    </>
  );
};

Multiselect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.array,
  options: PropTypes.array.isRequired,
  selectClass: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Multiselect;
