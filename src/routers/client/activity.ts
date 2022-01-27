import { Router } from "express";
import * as activityController from "@/controllers/client/activity";

const router = Router();

router.get("/", activityController.getAllActivities);

export default router;
