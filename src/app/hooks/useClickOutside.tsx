import { RefObject, useEffect } from "react";

type ClickOutsideAction = () => void;

const useClickOutside = (
  elemRef: RefObject<HTMLElement>,
  outsideAction: ClickOutsideAction = () => {},
  insideAction: ClickOutsideAction = () => {}
) => {
  return useEffect(() => {
    // @ts-ignore
    const handleClickOutside = ({ target }) => {
      if (!elemRef?.current?.contains(target)) {
        outsideAction();
      } else {
        insideAction();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [elemRef]);
};

export default useClickOutside;
