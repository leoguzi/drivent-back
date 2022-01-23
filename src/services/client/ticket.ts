import TicketData from "@/interfaces/ticket";
import Ticket from "@/entities/Ticket";
import * as enrollmentService from "@/services/client/enrollment";
import CannotBuyTicketBeforeEnrollError from "@/errors/CannotBuyTicketBeforeEnrollError";
import CannotBuyTicketOnlineWithHotelError from "@/errors/CannotBuyTicketOnlineWithHotelError";
import ConflictError from "@/errors/ConflictError";

export async function createNewTicket(ticketData: TicketData, userId: number) {
  const enrollment = await enrollmentService.getEnrollmentWithAddress(userId);
  if (!enrollment) {
    throw new CannotBuyTicketBeforeEnrollError;
  }

  if (ticketData.type === "online" && ticketData.withHotel) {
    throw new CannotBuyTicketOnlineWithHotelError;
  }

  ticketData.enrollment = enrollment;
  await Ticket.createTicket(ticketData);
}

export async function updatePaymentDateTicket(userId: number) {
  const enrollment = await enrollmentService.getEnrollmentWithAddress(userId);
  if (!enrollment) {
    throw new CannotBuyTicketBeforeEnrollError;
  }

  const ticket = await Ticket.getTicketByEnroll(enrollment);
  if (ticket.paymentDate) {
    throw new ConflictError("Você já pagou seu ingresso");
  }

  await Ticket.updatePaymentDate(enrollment);
}

export async function getTicket(userId: number) {
  const enrollment = await enrollmentService.getEnrollmentWithAddress(userId);
  
  return await Ticket.getTicketByEnroll(enrollment);
}
