import { validationResult } from "express-validator";
import AuthService from "../services/authService.js";
import TokensService from "../services/tokensService.js";
import { UserDto } from "../dtos/user.js";

class AuthController {
  async registration(req, res, next) {
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
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const user = await AuthService.login(req.body);
      const userDto = new UserDto(user); // id, email, name
      const tokens = TokensService.generateTokens({ ...userDto }); // check if possible just write userDto
      await TokensService.saveToken(userDto.id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ ...tokens, name: userDto.name, email: userDto.email });
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json();
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
