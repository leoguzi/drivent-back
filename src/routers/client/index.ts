import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import reservationRoute from "@/routers/client/reservation";
import ticketRouter from "@/routers/client/ticket";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/reservation", tokenValidationMiddleware, reservationRoute);
router.use("/tickets", tokenValidationMiddleware, ticketRouter);

export default router;
