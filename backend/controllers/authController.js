import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import AuthService from "../services/authService.js";
import TokensService from "../services/tokensService.js";
import { UserDto } from "../dtos/user.js";

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error on registration", errors });
      }
      const user = await AuthService.registration(req.body);
      const userDto = new UserDto(user); // id, email, name
      const tokens = TokensService.generateTokens({ ...userDto }); // check if possible just write userDto
      await TokensService.saveToken(userDto.id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ ...tokens, name: userDto.name, email: userDto.email });
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