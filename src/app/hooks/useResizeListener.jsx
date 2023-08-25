import { useResizeDetector } from "react-resize-detector";

const useResizeListener = () => {
  const { height, width, ref } = useResizeDetector();

  return [height, width, ref];
};

export default useResizeListener;
