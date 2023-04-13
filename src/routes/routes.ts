import { Router } from "express";

import AuthRoutes from "./auth.routes";
import PartnerRoutes from "./delivery-partner.routes";
import CustomerRoutes from "./customer.routes";

const router = Router();
router.use("/user", AuthRoutes);
router.use("/partner", PartnerRoutes);
router.use("/customer", CustomerRoutes);

export = router;
