import Reservation from "@/entities/Reservation";
import ReservationData from "@/interfaces/reservation";

export async function createNewReservation(reservationData: ReservationData) {
  return await Reservation.createOrUpdate(reservationData);
}
