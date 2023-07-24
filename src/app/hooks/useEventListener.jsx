import { useEffect } from "react";

const useEventListener = (event, callback) => {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    };
  }, []);
};

// Пустой массив зависимостей указывает на то, что слушатель добавляется и удаляется только один раз, при монтировании и размонтировании компонента.

export default useEventListener;
