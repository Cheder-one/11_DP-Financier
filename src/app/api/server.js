import { createServer, Model } from "miragejs";
import { faker } from "@faker-js/faker";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model
    },

    seeds(server) {
      for (let i = 0; i < 10; i++) {
        const gender = faker.person.sex();
        const firstName = faker.person.firstName({ sex: gender });
        const lastName = faker.person.lastName({ sex: gender });

        server.create("user", {
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({
            firstName,
            lastName: "_",
            provider: "example.com"
          }),
          password: faker.internet.password(),
          gender,
          avatarUrl: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`
        });
      }
    },

    routes() {
      this.namespace = "api";

      this.get(
        "/users",
        (schema) => {
          return schema.users.all();
        },
        { timing: 2000 }
      );

      this.post("/users/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.find(request.params.id);
        user.update(attrs);
        return user.attrs;
      });
    }
  });

  return server;
}
