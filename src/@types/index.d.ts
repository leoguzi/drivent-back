import Enrollment from "@/entities/Enrollment";
import Ticket from "@/entities/Ticket";

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: User
            enrollment?: Enrollment;
            ticket?: Ticket;
        }
    }
}

interface User {
    id: number;
}
