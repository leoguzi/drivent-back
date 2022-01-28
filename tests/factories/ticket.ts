import Enrollment from "../../src/entities/Enrollment";
import Ticket from "../../src/entities/Ticket";

export default async function createTicket(
  enrollment: Enrollment,
  withHotel = true,
  paidTicket = true,
  type = "presencial"
): Promise<Ticket> {
  const ticket = await Ticket.createTicket({ enrollment, withHotel, type });

  if (paidTicket) {
    await Ticket.updatePaymentDate(ticket);
  }

  return ticket;
}
