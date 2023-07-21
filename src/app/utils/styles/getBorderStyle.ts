const getBorderStyle = (
  touched: boolean,
  isOpen: boolean | null,
  isValid: boolean
): React.CSSProperties => {
  if (touched && isOpen === true) {
    return { border: "1px solid #cbd5e1" }; // gray
  } else if (touched && isValid) {
    return { border: "1px solid #20AF6D" }; // green
  } else if (touched && !isValid) {
    return { border: "1px solid red" }; // red
  } else {
    return { border: "1px solid #cbd5e1" };
  }
};

export default getBorderStyle;
