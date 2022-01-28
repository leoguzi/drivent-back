import Reservation from "@/entities/Reservation";
import Enrollment from "@/entities/Enrollment";
import * as hotelService from "@/services/client/hotel";
import ReservationData from "@/interfaces/reservation";
import NotFoundError from "@/errors/NotFoundError";
import ConflictError from "@/errors/ConflictError";

export async function createNewReservation(reservationData: ReservationData) {
  const room = await hotelService.getRoomById(reservationData.roomId);

  if(room.getAvailableVacancies() === 0) {
    throw new ConflictError("O quarto já está cheio");
  }
  
  return await Reservation.createOrUpdate(reservationData);
}

export async function findUserReservation(enrollment: Enrollment): Promise<ReservationData> {
  const reservation = await Reservation.getOneByEnrollment(enrollment);

  if (!reservation) {
    throw new NotFoundError("Você não possui reservas");
  }

  delete reservation.room.hotel.rooms;
  
  const formattedReservation: ReservationData = {
    ...reservation,
    room: {
      ...reservation.room,
      reservations: reservation.room.reservations.length
    }
  };
  return formattedReservation;
}
