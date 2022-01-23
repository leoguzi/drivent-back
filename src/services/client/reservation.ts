import Reservation from "@/entities/Reservation";
import ReservationData from "@/interfaces/reservation";

export async function createNewReservation(reservationData: ReservationData) {
  /* 
  
  verificar se ainda tem vaga no quarto fornecido

  */
  return await Reservation.createOrUpdate(reservationData);
}
