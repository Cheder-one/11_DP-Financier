import { useEffect, useState } from "react";
import { getActualQuotes } from "../../../utils";

const useActualQuotes = () => {
  const [actualQuotes, setActualQuotes] = useState([]);

  const fetchActualQuotes = async () => {
    const actualQuotes = await getActualQuotes();
    setActualQuotes(actualQuotes);
  };

  useEffect(() => {
    fetchActualQuotes();
  }, []);

  return actualQuotes;
};

export default useActualQuotes;
