import { Request, Response } from "express";
import { CreateUserInputDto, CreateUserUseCase } from "../../../../../application/useCases/user/create";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";

export type CreateUserResponseDTO = {
  message: string;
  token: string;
};

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUseCase
  ) {}

  public static create(createUserService: CreateUserUseCase) {
    return new CreateUserRoute("/users", HttpMethod.POST, createUserService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { name, email, password } = request.body;

        const input: CreateUserInputDto = {
          name,
          email,
          password,
        };

        const output: CreateUserResponseDTO =
          await this.createUserService.execute(input);

        const responseBody = this.present(output);
        response.status(201).json(responseBody);
      } catch (error) {
        if (error instanceof CustomError) {
          response.status(error.statusCode).json({ "Error": error.message });
        } else {
          response.status(500).json({ "Error": "Internal Server Error" });
        }
      }
    };
  }

  private present(input: CreateUserResponseDTO): CreateUserResponseDTO {
    return { message: input.message, token: input.token };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
