import { Router } from "express";
import { getUser, loginUser, signupUser } from "../controllers/auth.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = Router();
router.route("/register").post(signupUser);
router.route("/login").post(loginUser);
router.route("/").get(protectedRoute, getUser);

export = router;
