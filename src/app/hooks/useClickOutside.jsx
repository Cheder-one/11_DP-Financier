import { useEffect } from "react";

const useClickOutside = (elemRef, outsideAction, insideAction) => {
  return useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (!elemRef?.current?.contains(target)) {
        outsideAction();
      } else {
        // insideAction();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [elemRef]);
};

export default useClickOutside;
