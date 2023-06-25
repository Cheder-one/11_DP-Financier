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

      this.get("/users", (schema) => {
        return schema.users.all();
      });

      this.get("/users/:user_id", (schema, request) => {
        const userId = request.params.user_id;
        console.log(userId);
        return schema.users.find(userId);
      });
    }
  });
  return server;
}
