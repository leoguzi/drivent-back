import { Request, Response } from "express";
import httpStatus from "http-status";
import * as activityService from "@/services/client/activity";

export async function getEventSchedule(req: Request, res: Response) {
  const activities = await activityService.getEventSchedule();
    
  res.send(activities).status(httpStatus.OK);
}

export async function activityCheckin(req: Request, res: Response) {  
  await activityService.checkIn(req.body.activityId, req.enrollment);
  return res.sendStatus(httpStatus.OK);
}
