import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import AuthService from "../services/authService.js";

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error on registration", errors });
      }
      await AuthService.registration(req.body);
      return res.json({ message: "User successfully registered" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async login(req, res) {
    try {
      const user = await AuthService.login(req.body);
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: "30m",
      });
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}

export default new AuthController();
