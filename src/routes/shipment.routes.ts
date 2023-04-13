import { Router } from "express";
import {
  createShipment,
  getShipments,
  getShipmentsById,
} from "../controllers/shipment.controller";

const router = Router();

router.route("/create").post(createShipment);
router.route("/").get(getShipments);
router.route("/:id").get(getShipmentsById);

export = router;
