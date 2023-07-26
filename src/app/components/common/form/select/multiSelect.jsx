import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";

import { getNanoId } from "../../../../utils";

const Multiselect = ({
  name,
  value,
  options,
  placeholder,
  onChange,
  selectClass,
  error
}) => {
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
    const defaultClass = " relative z-10";

    return selectClass ? selectClass + defaultClass : defaultClass;
  };

  return (
    <>
      <CreatableSelect
        isMulti
        required
        value={value}
        options={options}
        placeholder={placeholder}
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
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  selectClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool
};

export default Multiselect;
