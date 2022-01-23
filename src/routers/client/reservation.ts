import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import reservationSchema from "@/schemas/reservationSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(reservationSchema), controller.saveReservationInfo);
router.get("/", controller.getReservationInfo);

export default router;
