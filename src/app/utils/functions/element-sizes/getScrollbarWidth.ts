const getScrollbarWidth = (ref: React.RefObject<HTMLElement>): number => {
  if (ref.current) {
    return ref.current.offsetWidth - ref.current.clientWidth;
  }
  return 0;
};

export default getScrollbarWidth;
