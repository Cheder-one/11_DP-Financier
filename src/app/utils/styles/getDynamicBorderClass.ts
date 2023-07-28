const getDynamicBorderClass = (
  touched: boolean,
  isOpen: boolean | null,
  isValid: boolean
): string => {
  if (touched && isOpen === true) {
    return "border-gray-light"; // gray
  } else if (touched && isValid) {
    return "border-success"; // green
  } else if (touched && isValid === false) {
    return "border-danger"; // red
  } else {
    return "border-gray-light";
  }
};

export default getDynamicBorderClass;
