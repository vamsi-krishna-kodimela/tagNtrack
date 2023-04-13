import { Router } from "express";
import { loginUser, signupUser } from "../controllers/auth.controller";

const router = Router();
router.route("/register").post(signupUser);
router.route("/login").post(loginUser);

export = router;
