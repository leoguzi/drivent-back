import Enrollment from "@/entities/Enrollment";
import Ticket from "@/entities/Ticket";

interface User {
  id: number;
}

declare namespace Express {
  export interface Request {
    adminId?: number;
    user?: User;
    enrollment?: Enrollment;
    ticket?: Ticket;
  }
}
