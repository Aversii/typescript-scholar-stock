import * as jwt from "jsonwebtoken";

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
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY is not defined");
    }

    const result = jwt.verify(
      token,
      process.env.JWT_KEY as string
    );

    return result as object;
  }
}

export default new Authenticator();
