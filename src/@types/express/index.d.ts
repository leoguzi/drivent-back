import Enrollment from "@/domain/Enrollment";
import Ticket from "@/domain/Ticket";

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
