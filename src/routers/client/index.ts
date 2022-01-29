import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import reservationRoute from "@/routers/client/reservation";
import ticketRouter from "@/routers/client/ticket";
import activityRouter from "@/routers/client/activity";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";
import ensureEnrolled from "@/middlewares/ensureEnrolledMiddleware";
import ensurePaidTicket from "@/middlewares/ensurePaidTicketMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

router.use(tokenValidationMiddleware);
router.use("/enrollments", enrollmentRouter);

router.use(ensureEnrolled);
router.use("/tickets", ticketRouter);

router.use(ensurePaidTicket);
router.use("/hotels", hotelRouter);
router.use("/reservation", reservationRoute);
router.use("/activities", activityRouter);

export default router;
