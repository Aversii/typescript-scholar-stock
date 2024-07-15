import { Request, Response } from "express";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";
import {
  LoginUserInputDto,
  LoginUserUseCase,
} from "../../../../../application/useCases/user/login";

export type LoginResponseDTO = {
  message: string;
  token: string;
};

export class LoginUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly loginUseCase: LoginUserUseCase
  ) {}

  public static login(loginUseCase: LoginUserUseCase) {
    return new LoginUserRoute("/login", HttpMethod.POST, loginUseCase);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { email, password } = request.body;

        const input: LoginUserInputDto = {
          email,
          password,
        };

        const output: LoginResponseDTO = await this.loginUseCase.execute(input);

        const responseBody = this.present(output);
        response.status(200).json(responseBody);
      } catch (error) {
        console.error(error);
        if (error instanceof CustomError) {
          response.status(error.statusCode).json({ Error: error.message });
        } else {
          response.status(500).json({ Error: "Internal Server Error" });
        }
      }
    };
  }

  private present(input: LoginResponseDTO): LoginResponseDTO {
    return { message: input.message, token: input.token };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
