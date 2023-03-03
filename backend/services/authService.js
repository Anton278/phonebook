import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../exceptions/api-error.js";

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
}

export default new AuthService();
