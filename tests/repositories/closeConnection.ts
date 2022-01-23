import { getConnection } from "typeorm";

export default async function closeConnection() {
  await getConnection().close();
}
