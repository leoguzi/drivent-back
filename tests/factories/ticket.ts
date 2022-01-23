import Enrollment from "../../src/entities/Enrollment";
import Ticket from "../../src/entities/Ticket";
import TicketData from "../../src/interfaces/ticket";

export default async function createTicket(enrollment: Enrollment): Promise<Ticket> {  
  const ticket: TicketData = {
    enrollment: enrollment,
    type: "presencial",
    withHotel: true,
    paymentDate: new Date()
  };

  await Ticket.createTicket(ticket);
  await Ticket.updatePaymentDate(enrollment);
  return;
}
