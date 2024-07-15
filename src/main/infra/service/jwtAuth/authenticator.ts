import * as jwt from "jsonwebtoken";
import { InvalidRequest_InvalidToken, InvalidRequest_JWTIsMissing } from "../../../error/customError";

class Authenticator {
  generateToken = (payload: object): string => {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY is not defined");
    }
    if (!process.env.JWT_EXPIRES_IN) {
      throw new Error("JWT_EXPIRES_IN is not defined");
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_KEY as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return token;
  }

  getTokenData = (token: string): object => {
    try {
      if (!process.env.JWT_KEY) {
        throw new InvalidRequest_JWTIsMissing();
      }
      if (!process.env.JWT_EXPIRES_IN) {
        throw new Error("JWT_EXPIRES_IN is not defined");
      }

      const result = jwt.verify(token, process.env.JWT_KEY as string);
      return result as object;
    } catch (error) {
      throw new InvalidRequest_InvalidToken();
    }
  }
}

export default new Authenticator();