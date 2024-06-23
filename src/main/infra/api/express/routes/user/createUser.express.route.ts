import { Request, Response } from "express";
import { CreateUserInputDto, CreateUserUseCase } from "../../../../../application/useCases/user/create";
import { HttpMethod, Route } from "../../route";

export type CreateUserResponseDTO = {
  message: string;
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
        response.status(201).json(responseBody).send();
      } catch (error:any) {
        response.status(400).json({"Error":error.message}).send();        
      }
    };
  }

  private present(input: CreateUserResponseDTO): CreateUserResponseDTO {
    const response = { message: input.message };
    return response;
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
