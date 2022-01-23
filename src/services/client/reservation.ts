
import * as enrollmentService from "@/services/client/enrollment";
import Reservation from "@/entities/Reservation";
import ReservationData from "@/interfaces/reservation";
import ForbiddenError from "@/errors/Forbidden";
import NotFoundReservationError from "@/errors/NotFoundReservation";

export async function createNewReservation(reservationData: ReservationData) {
  return await Reservation.createOrUpdate(reservationData);
}

export async function findUserReservation(userId: number): Promise<ReservationData> {
  const enrollment = await enrollmentService.getEnrollmentWithAddress(userId);
  if (!enrollment) {
    throw new ForbiddenError("Você precisa comprar um ingresso antes de fazer a escolha de hospedagem");
  }

  const reservation = await Reservation.findOne({ enrollmentId: enrollment.id }, { relations: ["room", "room.hotel", "room.reservations"] });
  if (!reservation) {
    throw new NotFoundReservationError();
  }

  delete reservation.room.hotel.rooms;
  //hideRoomReservationsInfos
  const formattedReservation: ReservationData = { ...reservation, room: { ...reservation.room, reservations: reservation.room.reservations.length } };
  return formattedReservation;
}
