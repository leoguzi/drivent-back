import { getRepository } from "typeorm";
import Reservation from "../../src/entities/Reservation";
import Room from "../../src/entities/Room";

export async function countReservations(room: Room): Promise<number> {
  return Reservation.count({ roomId: room.id });
}
