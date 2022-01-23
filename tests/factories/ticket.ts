import Enrollment from "../../src/entities/Enrollment";
import Ticket from "../../src/entities/Ticket";
import TicketData from "../../src/interfaces/ticket";

export default function createTicket(enrollment: Enrollment): Promise<Ticket> {  
  const ticket: TicketData = {
    enrollment: enrollment,
    type: "presencial",
    withHotel: true,
    paymentDate: new Date()
  };

  Ticket.createTicket(ticket);
  Ticket.updatePaymentDate(enrollment);
  return;
}
