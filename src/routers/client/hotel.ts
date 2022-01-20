import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.getHotelsInfos);
router.get("/:id/rooms", controller.getHotelRoomsInfo);

export default router;
