import { getRepository } from "typeorm";
import Enrollment from "../../src/entities/Enrollment";
import Reservation from "../../src/entities/Reservation";
import Room from "../../src/entities/Room";
import Ticket from "../../src/entities/Ticket";

export async function countReservations(room: Room): Promise<number> {
  return Reservation.count({ roomId: room.id });
}

