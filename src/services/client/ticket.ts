import TicketData from "@/interfaces/ticket";
import Ticket from "@/entities/Ticket";
import * as enrollmentService from "@/services/client/enrollment";
import CannotBuyTicketBeforeEnrollError from "@/errors/CannotBuyTicketBeforeEnrollError";
import CannotBuyTicketOnlineWithHotelError from "@/errors/CannotBuyTicketOnlineWithHotelError";

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
