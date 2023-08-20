import axios from "axios";

const getActualQuotes = async () => {
  try {
    const request = await axios.get("api/quotesData");
    const { quotesData } = request.data;
    return quotesData;
  } catch (err) {
    console.error("Ошибка при получении обновленных котировок:", err);
  }
};

export default getActualQuotes;
