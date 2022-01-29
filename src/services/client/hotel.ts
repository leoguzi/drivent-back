import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";
import TicketData from "@/interfaces/ticket";
import ForbiddenError from "@/errors/Forbidden";
import NoContentError from "@/errors/NoContentError";

export async function getHotelsInfos(ticket: TicketData) {
  if (!ticket.withHotel) {
    throw new ForbiddenError("Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades.");
  }

  const hotels = await Hotel.getHotelTypesOfRoomsAndAvailableVacancies();

  if(hotels.length < 1) {
    throw new NoContentError("Não há hotéis cadastrados");
  }
  
  return hotels;
}

export async function getHotelRooms(hotelId: number) {
  const rooms = await Hotel.getRooms(hotelId);

  return rooms;
}

export async function getRoomById(roomId: number) {
  return Room.getOneByIdWithReservations(roomId);
}

