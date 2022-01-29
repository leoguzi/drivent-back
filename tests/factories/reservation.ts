import Enrollment from "../../src/entities/Enrollment";
import Reservation from "../../src/entities/Reservation";
import Room from "../../src/entities/Room";

export default async function createReservation(room: Room, enrollment: Enrollment): Promise<Reservation> {
  const reservation = new Reservation();
  reservation.room = room;
  reservation.enrollment = enrollment;
  return Reservation.save(reservation);
}

