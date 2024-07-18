import * as jwt from "jsonwebtoken";
import { InvalidRequest_InvalidToken, InvalidRequest_JWTIsMissing } from "../../../error/customError";

export type AuthenticationData = {
  id: string;
};

class Authenticator {
  generateToken = (payload: AuthenticationData): string => {
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

  getTokenData = (token: string): AuthenticationData => {
    try {
      if (!process.env.JWT_KEY) {
        throw new InvalidRequest_JWTIsMissing();
      }
      if (!process.env.JWT_EXPIRES_IN) {
        throw new Error("JWT_EXPIRES_IN is not defined");
      }

      const result = jwt.verify(token, process.env.JWT_KEY as string);
      return result as AuthenticationData;
    } catch (error) {
      throw new InvalidRequest_InvalidToken();
    }
  }
}

export default new Authenticator();