import jwt from "jsonwebtoken";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";

export default function createSession(user: User): Promise<Session> {
  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET);

  return Session.createNew(user.id, token);
}
