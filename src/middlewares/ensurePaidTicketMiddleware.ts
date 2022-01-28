import { Request, Response, NextFunction } from "express";
import * as ticketService from "../services/client/ticket";

import ForbiddenError from "@/errors/Forbidden";

export default async function ensurePaidTicket(req: Request, res: Response, next: NextFunction) {
  const ticket = await ticketService.getTicketByEnrollment(req.enrollment);

  if (!ticket) {
    throw new ForbiddenError("Você precisa ter comprar um ticket antes de prosseguir");
  }

  if (!ticket.paymentDate) {
    throw new ForbiddenError("Você precisa ter confirmado pagamento antes de prosseguir");
  }

  req.ticket = ticket;
  next();
}
