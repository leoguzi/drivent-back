import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";
import InvalidQueryParameterError from "@/errors/InvalidQueryParameterError";

export async function getHotelsInfos(req: Request, res: Response) {
  const hotelInfo = await hotelService.getHotelsInfos(req.ticket);
  
  return res.status(httpStatus.OK).send(hotelInfo);
}

export async function getHotelRoomsInfo(req: Request, res: Response) {
  const hotelId = Number(req.params.id);
  
  if (!hotelId) {
    throw new InvalidQueryParameterError("O parâmetro fornecido para id do hotel é inválido");
  }

  const rooms = await hotelService.getHotelRooms(hotelId);

  return res.send(rooms).status(httpStatus.OK);
}
