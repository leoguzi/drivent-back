import { Router } from "express";
import * as certificateController from "@/controllers/client/certificate";

const router = Router();

router.get("/", certificateController.getCertificate);

export default router;

