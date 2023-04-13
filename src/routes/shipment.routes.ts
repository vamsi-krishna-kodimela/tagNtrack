import { Router } from "express";
import { createShipment } from "../controllers/shipment.controller";

const router = Router();

router.route("/create").post(createShipment);

export = router;
