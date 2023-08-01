import { some } from "lodash";

/**
 * Проверяет уникальность имени нового элемента в массиве элементов пользователя.
 * @param item - Элемент, имя которого проверяется на уникальность.
 * @param userItemArray - Массив элементов пользователя, в котором выполняется поиск.
 * @returns `true`, если имя элемента уникально или `false`, если не уникально.
 */

const checkIsNewNameUniq = (
  item: { id: string; name: string },
  userItemArray: { name: string }[]
) => {
  return item.id === "isNew"
    ? !some(userItemArray, { name: item.name })
    : true;
};

export default checkIsNewNameUniq;
