import faker from "faker";
import User from "../../src/entities/User";

export default function createUser(avoidName: string = null): Promise<User> {
  let newName = faker.name.firstName();

  while (avoidName === newName) {
    newName = faker.name.firstName();
  }

  const email= faker.internet.email(newName);
  const password = faker.internet.password(15);

  return User.createNew(email, password);
}
