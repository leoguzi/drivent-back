import Hotel from "@/entities/Hotel";
import * as enrollmentService from "./enrollment";
import ForbiddenError from "@/errors/Forbidden";

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
  
  return hotels;
}
