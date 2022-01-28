import TicketData from "@/interfaces/ticket";
import Ticket from "@/entities/Ticket";
import Enrollment from "@/entities/Enrollment";
import CannotBuyTicketOnlineWithHotelError from "@/errors/CannotBuyTicketOnlineWithHotelError";
import ConflictError from "@/errors/ConflictError";

export async function createNewTicket(ticketData: TicketData) {
  if (ticketData.type === "online" && ticketData.withHotel) {
    throw new CannotBuyTicketOnlineWithHotelError;
  }

  await Ticket.createTicket(ticketData);
}

export async function getTicketByEnrollment(enrollment: Enrollment) {  
  return Ticket.getTicketByEnroll(enrollment);
}

export async function getTicketWithValueByEnrollment(enrollment: Enrollment) {  
  return Ticket.getTicketWithValueByEnroll(enrollment);
}

export async function updatePaymentDateTicket(enrollment: Enrollment) {
  const ticket = await getTicketByEnrollment(enrollment);

  if (ticket.paymentDate) {
    throw new ConflictError("Você já pagou seu ingresso");
  }

  await Ticket.updatePaymentDate(ticket);
}

