const isFilterBy = {
  all: (id: string) => id.startsWith("all"),
  account: (id: string) => id.startsWith("account"),
  date: (id: string) => id.startsWith("transaction")
};

export default isFilterBy;
