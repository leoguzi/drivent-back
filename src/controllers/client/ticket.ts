import { Request, Response } from "express";
import * as ticketService from "@/services/client/ticket";
import TicketData from "@/interfaces/ticket";
import httpStatus from "http-status";

export async function saveTicketInfo(req: Request, res: Response) {
  const ticketData = req.body as TicketData;
  
  await ticketService.createNewTicket(ticketData, req.user.id);

  res.sendStatus(httpStatus.OK);
}
