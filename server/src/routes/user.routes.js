import express, { Router} from "express";
import { register, login, logout, getUser } from "../controllers/user.controllers.js";
import { isVerified } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(isVerified, logout)
router.route("/get-user").get(isVerified, getUser)

export default router