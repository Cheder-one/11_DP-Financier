import { useEffect } from "react";

const useFocus = (inputRef) => {
  useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFocus;
