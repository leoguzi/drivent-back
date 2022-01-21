import TicketData from "@/interfaces/ticket";
import Ticket from "@/entities/Ticket";
import * as enrollmentService from "@/services/client/enrollment";
import CannotBuyTicketBeforeEnrollError from "@/errors/CannotBuyTicketBeforeEnrollError";

export async function createNewTicket(ticketData: TicketData, userId: number) {
  const enrollment = await enrollmentService.getEnrollmentWithAddress(userId);
  if (!enrollment) {
    throw new CannotBuyTicketBeforeEnrollError;
  }
  ticketData.enrollment = enrollment;
  await Ticket.createTicket(ticketData);
}
