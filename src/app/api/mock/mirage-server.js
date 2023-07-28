import { createServer, Model } from "miragejs";
import users from "../data/users.json";

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
        users
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => {
        return schema.users.all();
      });

      this.get(
        "/users/:user_id",
        (schema, request) => {
          const userId = request.params.user_id;
          return schema.users.find(userId);
        },
        { timing: 500 }
      );

      // // Маршрут обновления пользователя
      // this.put("/users/:user_id", (schema, request) => {
      //   const userId = request.params.user_id;
      //   const attrs = JSON.parse(request.requestBody);

      //   // Находим пользователя по ID
      //   const user = schema.users.find(userId);

      //   // Обновляем данные пользователя
      //   user.update(attrs);

      //   // Возвращаем обновленного пользователя
      //   return user;
      // });

      // Маршрут создания категории
      this.post("/users/:user_id/categories", (schema, request) => {
        const userId = request.params.user_id;
        const user = schema.users.find(userId);

        const newCategory = JSON.parse(request.requestBody);

        // Добавляем новую категорию в массив categories пользователя
        user.update({
          categories: [...user.categories, newCategory]
        });

        return user;
      });

      // Маршрут создания транзакции
      this.post("/users/:user_id/transactions", (schema, request) => {
        const userId = request.params.user_id;
        const user = schema.users.find(userId);

        const newCategory = JSON.parse(request.requestBody);

        user.update({
          transactions: [...user.transactions, newCategory]
        });

        return user;
      });
    }
  });

  return server;
}
