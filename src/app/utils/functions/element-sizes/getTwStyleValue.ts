const getTwStyleValue = (
  ref: React.RefObject<HTMLElement>,
  elemStyle: string
): string => {
  if (ref.current) {
    const element = ref.current;
    const style = window.getComputedStyle(element);
    const paddingRight = style.getPropertyValue(elemStyle);
    return paddingRight;
  }
  return "";
};

export default getTwStyleValue;
