const getIdAllItem = (type: string) => {
  return {
    id: "all-" + (type ? `${type}-ids` : "ids"),
    type,
    name: "Все"
  };
};

export default getIdAllItem;
