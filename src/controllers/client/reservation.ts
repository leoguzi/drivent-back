import { Request, Response } from "express";
import httpStatus from "http-status";

import * as reservationService from "@/services/client/reservation";
import ReservationData from "@/interfaces/reservation";

export async function saveReservationInfo(req: Request, res: Response) {
  const reservationData = req.body as ReservationData;
  await reservationService.createNewReservation({ ...reservationData, enrollment: req.enrollment });
  res.sendStatus(httpStatus.CREATED);
}

export async function getReservationInfo(req: Request, res: Response) {
  const reservation = await reservationService.findUserReservation(req.enrollment);
  res.send(reservation).status(httpStatus.OK);
}
