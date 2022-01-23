import { Request, Response } from "express";
import httpStatus from "http-status";

import * as reservationService from "@/services/client/reservation";
import ReservationData from "@/interfaces/reservation";

export async function saveReservationInfo(req: Request, res: Response) {
  const reservationData = req.body as ReservationData;
  await reservationService.createNewReservation(reservationData);
  res.sendStatus(httpStatus.CREATED);
}
