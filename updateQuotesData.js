import fs from "fs";
import cron from "node-cron";
import fetch from "node-fetch";

const url = "https://www.cbr-xml-daily.ru/daily_json.js";
const dataFilePath = "./src/app/api/data/quotesData.json";

async function updateQuotesData() {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    // Save the updated data to a file
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

    console.log("Node running. Currency data updated successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Обновление данных при запуске скрипта
updateQuotesData();

// Задает обновление данных в 12:00, 18:00 и 00:00
cron.schedule("0 0,6,12,18 * * *", () => {
  updateQuotesData();
});

// cron.schedule("20 10 * * *", () => {
//   updateQuotesData();
// });
