import Ticket from "@/domain/Ticket";
import Enrollment from "@/domain/Enrollment";

interface TicketData extends Ticket{
    enrollment?: Enrollment
}

export default TicketData;
