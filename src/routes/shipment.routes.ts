import { Router } from "express";
import {
  createShipment,
  getShipmentsById,
} from "../controllers/shipment.controller";

const router = Router();

router.route("/create").post(createShipment);
router.route("/:id").get(getShipmentsById);

export = router;
