import { Router } from "express";
import * as ticketController from "@/controllers/client/ticket";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(ticketSchema), ticketController.saveTicketInfo);

export default router;
