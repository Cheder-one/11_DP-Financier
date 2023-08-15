// import PropTypes from "prop-types";
// import CreatableSelect from "react-select/creatable";

// import { genNanoId } from "../../app/utils";

// const Multiselect = ({
//   name,
//   value,
//   options,
//   placeholder,
//   onChange,
//   containerClass,
//   multiSelectClass,
//   error
// }) => {
//   const getCategoryId = () => {
//     return "category-id-" + genNanoId();
//   };

//   const toInitFormat = (items) => {
//     return items.map(({ label, value, __isNew__ }) => ({
//       id: __isNew__ ? getCategoryId() : value,
//       name: label
//     }));
//   };

//   const handleChange = (selectedOptions) => {
//     onChange({
//       target: {
//         name,
//         value: toInitFormat(selectedOptions)
//       }
//     });
//   };

//   const getClassName = () => {
//     const defaultClass = " relative z-10";

//     if (multiSelectClass) {
//       return multiSelectClass + defaultClass;
//     }
//     return defaultClass;
//   };

//   return (
//     <div className={containerClass}>
//       <CreatableSelect
//         isClearable
//         required
//         value={value}
//         options={options}
//         placeholder={placeholder}
//         className={getClassName()}
//         onChange={handleChange}
//       />
//       {error && (
//         <div className="text-red-500 mt-1 text-sm">
//           Выберите хотя бы одну категорию
//         </div>
//       )}
//     </div>
//   );
// };

// Multiselect.propTypes = {
//   name: PropTypes.string.isRequired,
//   value: PropTypes.array,
//   options: PropTypes.array.isRequired,
//   placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//   containerClass: PropTypes.string,
//   multiSelectClass: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   error: PropTypes.bool
// };

// export default Multiselect;
