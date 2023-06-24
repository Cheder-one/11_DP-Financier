import { createServer, Model } from "miragejs";
import users from "../data/users.json";
import accounts from "../data/accounts.json";
import categories from "../data/categories.json";
import transactions from "../data/transactions.json";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
      account: Model,
      category: Model,
      transaction: Model
    },

    seeds(server) {
      server.db.loadData({
        users,
        accounts,
        categories,
        transactions
      });
    },

    routes() {
      this.namespace = "api";

      // Маршруты для пользователей
      this.get("/users", (schema) => {
        return schema.users.all();
      });
      this.get("/users/:id", (schema, request) => {
        const id = request.params.id;
        return schema.users.find(id);
      });

      // Маршруты для счетов
      this.get("/accounts", (schema) => {
        return schema.accounts.all();
      });
      this.get("/accounts/:id", (schema, request) => {
        const id = request.params.id;
        const accounts = schema.accounts.where({ userId: id });
        return accounts.models;
      });

      // Маршруты для категорий
      this.get(
        "/categories",
        (schema) => {
          return schema.categories.all();
        },
        { timing: 1000 }
      );
      this.get(
        "/categories/:id",
        (schema, request) => {
          const id = request.params.id;
          const categories = schema.categories.where({ userId: id });
          return categories.models;
        },
        { timing: 1000 }
      );

      // Маршруты для транзакций
      this.get("/transactions", (schema) => {
        return schema.transactions.all();
      });
      this.get(
        "/transactions/user/:id",
        (schema, request) => {
          const id = request.params.id;
          const transactions = schema.transactions.where({ userId: id });
          return transactions.models;
        },
        { timing: 1000 }
      );
      this.get(
        "/transactions/date/:date",
        (schema, request) => {
          const date = request.params.date;
          const transactions = schema.transactions.where({ date });
          return transactions.models;
        },
        { timing: 1000 }
      );
    }
  });
  return server;
}