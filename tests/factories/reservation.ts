import Enrollment from "../../src/entities/Enrollment";
import Reservation from "../../src/entities/Reservation";
import Room from "../../src/entities/Room";
import createHotel from "./hotel";
import createRoom from "./room";

export default async function createReservation(enrollment: Enrollment, room: Room = null): Promise<Reservation> {
  if (!room) {
    const hotel = await createHotel();
    room = await createRoom(hotel);
  }
  return Reservation.createNew(room, enrollment);
}
