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

      this.get("/users/:user_id", (schema, request) => {
        const userId = request.params.user_id;
        return schema.users.find(userId);
      });
    }
  });
  return server;
}
