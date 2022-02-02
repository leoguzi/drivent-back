import { Router } from "express";
import * as certificateController from "@/controllers/client/certificate";

const router = Router();

router.get("/certificate.pdf", certificateController.getCertificatePDF);

export default router;
