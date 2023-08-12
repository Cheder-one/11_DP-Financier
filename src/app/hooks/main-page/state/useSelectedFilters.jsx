import { useState } from "react";

const useSelectedFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    account: { id: "" },
    income: { id: "" },
    expense: { id: "" }
  });

  return [selectedFilters, setSelectedFilters];
};

export default useSelectedFilters;
