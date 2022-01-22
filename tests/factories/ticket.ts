import Ticket from "../../src/entities/Ticket";
import TicketData from "../../src/interfaces/ticket";

export default function createTicket(data: TicketData): Promise<Ticket> {  
  return Ticket.createTicket(data);
}
