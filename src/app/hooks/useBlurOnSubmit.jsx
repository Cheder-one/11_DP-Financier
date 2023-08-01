import { useEffect, useState } from "react";

const useBlurOnSubmit = (isSubmit) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    if (!isInitialRender) {
      setIsBlur(true);
    } else {
      setIsInitialRender(false);
    }
    // eslint-disable-next-line
  }, [isSubmit]);

  return [isBlur, setIsBlur];
};
export default useBlurOnSubmit;
