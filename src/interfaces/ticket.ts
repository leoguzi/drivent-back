import Enrollment from "@/entities/Enrollment";

interface TicketData{
    enrollment: Enrollment,
    type: string,
    paymentDate?: string,
    withHotel: boolean
}

export default TicketData;
