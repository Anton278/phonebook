import User from "./models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error on registration", errors });
      }
      const { name, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this email already exist" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await User.create({ name, email, password: hashPassword });
      return res.json({ message: "User successfully registered" });
    } catch (e) {
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Incorrect username or password" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Incorrect username or password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: "30m",
      });
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: "Login error" });
    }
  }
}

export default new AuthController();
