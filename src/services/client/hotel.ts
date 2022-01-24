import Hotel from "@/entities/Hotel";
import * as enrollmentService from "./enrollment";
import ForbiddenError from "@/errors/Forbidden";
import NoContentError from "@/errors/NoContentError";
import NotFoundError from "@/errors/NotFoundError";

export async function getHotelsInfos(userId: number) {
  const enrollment =  await enrollmentService.getEnrollmentWithAddress(userId);

  if (!enrollment) {
    throw new ForbiddenError("Você precisa comprar um ingresso antes de fazer a escolha de hospedagem");
  }

  const ticket = enrollment.ticket;

  if (!ticket || !ticket.paymentDate) {
    throw new ForbiddenError("Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem");
  }

  if (!ticket.withHotel) {
    throw new ForbiddenError("Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades.");
  }

  const hotels = await Hotel.getHotelTypesOfRoomsAndAvailableVacancies();

  if(hotels.length < 1) {
    throw new NoContentError("Não há hotéis cadastrados");
  }
  
  return hotels;
}

export async function getHotelRooms(hotelId: number, userId: number) {
  const enrollment =  await enrollmentService.getEnrollmentWithAddress(userId);

  if (!enrollment) {
    throw new ForbiddenError("Você precisa comprar um ingresso antes de fazer a escolha de hospedagem");
  }

  const hotel: Hotel = await Hotel.findOne({ id: hotelId });

  if(!hotel) {
    throw new NotFoundError("Não há hotéis cadastrados");
  }

  const rooms = hotel.getRooms();

  if(rooms.length < 1) {
    throw new NoContentError("Não há hotéis cadastrados");
  }

  return rooms;
}

