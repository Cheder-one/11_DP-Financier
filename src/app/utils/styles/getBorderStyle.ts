const getBorderStyle = (
  touched: boolean,
  isOpen: boolean | null,
  isValid: boolean
): string => {
  if (touched && isOpen === true) {
    return "border-[#dee2e6]"; // gray
  } else if (touched && isValid) {
    return "border-[#198754]"; // green
  } else if (touched && !isValid) {
    return "border-[#dc3545]"; // red
  } else {
    return "border-[#cbd5e1]";
  }
};

export default getBorderStyle;
