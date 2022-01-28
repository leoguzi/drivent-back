import Enrollment from "@/domain/Enrollment";
import Ticket from "@/domain/Ticket";

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
