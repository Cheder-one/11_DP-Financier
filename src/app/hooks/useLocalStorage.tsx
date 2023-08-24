import { keys } from "lodash";
import { useEffect, useState } from "react";

interface ItemObj {
  [key: string]: boolean;
}

const useLocalStorage = (item: ItemObj) => {
  const name = keys(item)[0];
  const value = item[name];
  // @ts-ignore
  const itemInStorage = JSON.parse(localStorage.getItem(name));
  const initVal = itemInStorage === null ? value : itemInStorage;

  const [elem, setElem] = useState(initVal);

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(elem));
  }, [name, elem]);

  return [elem, setElem];
};

export default useLocalStorage;
