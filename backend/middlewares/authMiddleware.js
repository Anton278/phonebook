import ApiError from "../exceptions/api-error.js";
import TokensService from "../services/tokensService.js";

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next(); // ?
  }

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unauthorizedError());
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorizedError());
    }

    const userData = TokensService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorizedError());
    }

    req.user = userData; // ?
    next();
  } catch (e) {
    return next(ApiError.unauthorizedError());
  }
}
