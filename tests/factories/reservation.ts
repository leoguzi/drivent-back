import Enrollment from "../../src/entities/Enrollment";
import Reservation from "../../src/entities/Reservation";
import Room from "../../src/entities/Room";
import ReservationData from "../../src/interfaces/reservation";
import createHotel from "./hotel";
import createRoom from "./room";

export default async function createReservation(enrollment: Enrollment, room: Room = null): Promise<ReservationData> {
  if (!room) {
    const hotel = await createHotel();
    room = await createRoom(hotel);
  }

  const reservationData: ReservationData = {
    roomId: room.id, enrollmentId: enrollment.id,
  };

  const reservation = await Reservation.createOrUpdate(reservationData);
  
  return { ...reservation, room };
}

