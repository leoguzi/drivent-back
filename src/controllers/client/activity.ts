import { Request, Response } from "express";
import httpStatus from "http-status";
import * as activityService from "@/services/client/activity";

export async function getAllActivities(req: Request, res: Response) {
  const activities = await activityService.getAllActivities();
    
  res.send(activities).status(httpStatus.OK);
}