import Enrollment from "@/entities/Enrollment";

interface TicketData{
    enrollment: Enrollment,
    type: string,
    paymentDate?: Date | null,
    withHotel: boolean
}

export default TicketData;
