import faker from "faker";
import User from "../../src/entities/User";

export default function createUser(name: string): Promise<User> {
  let newName = faker.name.firstName();

  while (name === newName) {
    newName = faker.name.firstName();
  }

  const email= faker.internet.email(newName);
  const password = faker.internet.password(6);

  return User.createNew(email, password);
}
