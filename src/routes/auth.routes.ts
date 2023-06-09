import { Router } from "express";
import {
  getUser,
  getUserById,
  loginUser,
  signupUser,
} from "../controllers/auth.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = Router();
router.route("/register").post(signupUser);
router.route("/login").post(loginUser);
router.route("/").get(protectedRoute, getUser);
router.route("/:id").get(protectedRoute, getUserById);

export = router;
