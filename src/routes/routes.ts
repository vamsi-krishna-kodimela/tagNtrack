import { Router } from "express";

import AuthRoutes from "./auth.routes";
import PartnerRoutes from "./delivery-partner.routes";
import ShipmentRoutes from "./shipment.routes";
import { protectedRoute } from "../middleware/auth.middleware";

const router = Router();
router.use("/user", AuthRoutes);
router.use("/partner", PartnerRoutes);
router.use("/shipment", protectedRoute, ShipmentRoutes);

export = router;
