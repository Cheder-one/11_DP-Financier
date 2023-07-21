const getBorderStyle = (
  touched: boolean,
  isOpen: boolean | null,
  isValid: boolean
): React.CSSProperties => {
  if (touched && isOpen === true) {
    return { border: "1px solid #cbd5e1" };
  } else if (touched && isValid) {
    return { border: "1px solid green" };
  } else if (touched && !isValid) {
    return { border: "1px solid red" };
  } else {
    return { border: "1px solid #cbd5e1" };
  }
};

export default getBorderStyle;
