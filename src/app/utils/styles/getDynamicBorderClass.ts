const getDynamicBorderClass = (
  touched: boolean,
  isOpen: boolean | null,
  isValid: boolean
): string => {
  if (touched && isOpen === true) {
    return "border-gray-light";
  } else if (touched && isValid) {
    return "border-success";
  } else if (touched && isValid === false) {
    return "border-danger";
  } else {
    return "border-gray-light";
  }
};

export default getDynamicBorderClass;
