import { useEffect } from "react";

const useFocus = (inputRef) => {
  useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line
  }, []);
};

export default useFocus;
