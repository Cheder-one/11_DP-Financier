import { keys } from "lodash";
import { useEffect, useState } from "react";

interface ItemObj {
  [key: string]: boolean;
}

const useLocalStorage = (item: ItemObj) => {
  const name = keys(item)[0];
  const [elem, setElem] = useState(() =>
    // @ts-ignore
    JSON.parse(localStorage.getItem(name))
  );

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(elem));
  }, [elem]);

  return [elem, setElem];
};

export default useLocalStorage;
