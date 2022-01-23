import faker from "faker";
import User from "../../src/entities/User";

export default function createUser(avoidEmail: string = null): Promise<User> {
  let email = faker.internet.email();

  while (avoidEmail === email) {
    email = faker.internet.email();
  }

  const password = faker.internet.password(15);

  return User.createNew(email, password);
}
