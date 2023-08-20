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

    console.log("Currency data updated successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Обновление данных при запуске скрипта
updateQuotesData();

// Планирование обновления данных каждый день в 00:00
cron.schedule("0 0 * * *", () => {
  updateQuotesData();
});
