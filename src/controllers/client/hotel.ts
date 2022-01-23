import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";

export async function getHotelsInfos(req: Request, res: Response) {
  const hotelInfo = await hotelService.getHotelsInfos(req.user.id);

  if(!hotelInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(hotelInfo).status(httpStatus.OK);
}

export async function getHotelRoomsInfo(req: Request, res: Response) {
  const id = Number(req.params.id);
  
  if (!id) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const rooms = await hotelService.getHotelRooms(id, req.user.id);

  if(!rooms) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(rooms).status(httpStatus.OK);
}
