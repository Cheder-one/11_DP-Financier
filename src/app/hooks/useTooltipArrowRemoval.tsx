import { useEffect } from "react";

const useTooltipArrowRemoval = (
  findParentBy: string,
  findChildrenBy: string
): void => {
  useEffect(() => {
    const parent = document.querySelector(findParentBy);
    let children = null;

    if (parent) {
      children = parent.querySelector(findChildrenBy);
    }

    if (children) {
      children.remove();
    }
  }, []);
};

export default useTooltipArrowRemoval;
