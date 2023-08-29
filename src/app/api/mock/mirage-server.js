import { findIndex, remove } from "lodash";
import { createServer, Model } from "miragejs";

import users from "../data/users.json";
import quotesData from "../data/quotesData.json";
import { evaluate } from "mathjs";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
      quotesData: Model
    },

    seeds(server) {
      server.db.loadData({
        users,
        quotesData
      });
    },

    routes() {
      this.namespace = "api";

      // this.passthrough("https://www.cbr-xml-daily.ru/**");

      // Маршрут для получения всех user's
      this.get("/users", (schema) => {
        return schema.users.all();
      });

      // Маршрут поиска user-а
      this.get(
        "/users/:user_id",
        (schema, request) => {
          const userId = request.params.user_id;
          const user = schema.users.find(userId);
          return user;
        },
        { timing: 500 }
      );

      // Маршрут получения актуальных котировок
      this.get("/quotesData", (schema) => {
        return schema.quotesData.all();
      });

      // Маршрут создания счета
      this.post("/users/:user_id/accounts", (schema, request) => {
        const userId = request.params.user_id;
        const user = schema.users.find(userId);

        const newTransaction = JSON.parse(request.requestBody);

        user.accounts.push(newTransaction);
        user.save();
        return user;
      });

      // Маршрут создания категории
      this.post("/users/:user_id/categories", (schema, request) => {
        const userId = request.params.user_id;
        const user = schema.users.find(userId);

        const newTransaction = JSON.parse(request.requestBody);

        user.categories.push(newTransaction);
        user.save();
        return user;
      });

      // Маршрут создания транзакции
      // this.post("/users/:user_id/transactions", (schema, request) => {
      //   const userId = request.params.user_id;
      //   const user = schema.users.find(userId);

      //   const newTransaction = JSON.parse(request.requestBody);

      //   user.transactions.push(newTransaction);
      //   user.save();
      //   return user;
      // });

      this.post("/users/:user_id/transactions", (schema, request) => {
        const userId = request.params.user_id;
        const user = schema.users.find(userId);

        const newTransaction = JSON.parse(request.requestBody);
        const accountId = newTransaction.account;

        const accountIndex = findIndex(user.accounts, {
          id: accountId
        });

        if (accountIndex !== -1) {
          const account = user.accounts[accountIndex];

          // Обновляем баланс в зависимости от типа транзакции
          if (newTransaction.type === "expense") {
            const balance = evaluate(
              `${account.value} - ${Math.abs(newTransaction.value)}`
            );
            account.value = String(balance);
          }
          if (newTransaction.type === "income") {
            const balance = evaluate(
              `${account.value} + ${newTransaction.value}`
            );
            account.value = String(balance);
          }

          // Добавляем транзакцию в массив транзакций счета
          account.transactions.push(newTransaction);

          // Обновляем данные счета в объекте пользователя
          user.accounts[accountIndex] = account;
          user.save();
        }

        return user;
      });

      // Маршрут создания вида счета (entity)
      this.post("/users/:user_id/entities", (schema, request) => {
        const userId = request.params.user_id;
        const user = schema.users.find(userId);

        const newEntity = JSON.parse(request.requestBody);

        user.entities.push(newEntity);
        user.save();
        return user;
      });

      // Маршрут для удаления транзакций
      this.delete(
        "/users/:user_id/transactions/:transaction_id",
        (schema, request) => {
          const userId = request.params.user_id;
          const transactId = request.params.transaction_id;
          const user = schema.users.find(userId);

          remove(user.transactions, { id: transactId });
          user.save();

          return user;
        }
      );
    }
  });

  return server;
}
