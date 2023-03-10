import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../exceptions/api-error.js";
import TokensService from "./tokensService.js";

class AuthService {
  async registration({ name, email, password }) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("User with this email already exist");
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = await User.create({ name, email, password: hashPassword });
    return user;
  }
  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Incorrect username or password");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw ApiError.BadRequest("Incorrect username or password");
    }
    return user;
  }
  async logout(refreshToken) {
    const token = await TokensService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = TokensService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokensService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }
    const user = await User.findById(userData.id);
    return user;
  }
}

export default new AuthService();
