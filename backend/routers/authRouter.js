import Router from "express";
import AuthController from "../controllers/authController.js";
import { check } from "express-validator";

const router = new Router();

router.post(
  "/registration",
  [check("name", "Name can not be empty").notEmpty()],
  AuthController.registration
);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthController.refresh);

export default router;
