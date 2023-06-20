import { createServer, Model } from "miragejs";
import { faker } from "@faker-js/faker";
import getAvatarSrc from "../../utils/getAvatar";
import { nanoid } from "nanoid";

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
          id: nanoid(10),
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({
            firstName,
            lastName: "_",
            provider: "example.com"
          }),
          password: faker.internet.password(),
          gender,
          avatarUrl: getAvatarSrc()
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
        { timing: 1000 }
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