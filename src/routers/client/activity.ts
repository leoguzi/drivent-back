import { Router } from "express";
import * as activityController from "@/controllers/client/activity";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import activityCheckinSchema from "@/schemas/activityCheckinSchema";

const router = Router();

router.get("/", activityController.getAllActivities);
router.post("/check-in", schemaValidatingMiddleware(activityCheckinSchema), activityController.activityCheckin);

export default router;
