import { useEffect } from "react";

const useEventListener = (event, callback, area = document) => {
  useEffect(() => {
    area.addEventListener(event, callback);

    return () => {
      area.removeEventListener(event, callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// Пустой массив зависимостей указывает на то, что слушатель добавляется и удаляется только один раз, при монтировании и размонтировании компонента.

export default useEventListener;
