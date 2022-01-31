import { getConnection, EntityTarget, BaseEntity } from "typeorm";
import Enrollment from "../../src/entities/Enrollment";
import Hotel from "../../src/entities/Hotel";
import Reservation from "../../src/entities/Reservation";
import Room from "../../src/entities/Room";
import Ticket from "../../src/entities/Ticket";
import Address from "../../src/entities/Address";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import Setting from "../../src/entities/Setting";
import Activity from "../../src/entities/Activity";

export async function clearTable(entity: EntityTarget<BaseEntity>) {
  return getConnection()
    .createQueryBuilder()
    .delete()
    .from(entity)
    .where("id >= :id", { id: 1 })
    .execute();
}

export async function clearDatabase() {
  // hotel relations
  await clearTable(Reservation);
  await clearTable(Room);
  await clearTable(Hotel);

  // enrollment relations
  await clearTable(Ticket);
  await clearTable(Address);
  await clearTable(Enrollment);

  // user relations
  await clearTable(Session);
  await clearTable(User);
  await clearTable(Setting);

  //activities relations

  await clearTable(Activity);
}
