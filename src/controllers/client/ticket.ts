import { Request, Response } from "express";
import * as ticketService from "@/services/client/ticket";
import TicketData from "@/interfaces/ticket";
import httpStatus from "http-status";

export async function saveTicketInfo(req: Request, res: Response) {
  const ticketData = { ...req.body, enrollment: req.enrollment } as TicketData;
  
  await ticketService.createNewTicket(ticketData);

  res.sendStatus(httpStatus.CREATED);
}

export async function updateTicketInfo(req: Request, res: Response) {
  await ticketService.updatePaymentDateTicket(req.enrollment);
  res.sendStatus(httpStatus.OK);
}

export async function getTicketInfo(req: Request, res: Response) {
  const ticket = await ticketService.getTicketWithValueByEnrollment(req.enrollment);
  res.send(ticket).status(httpStatus.OK);
}
