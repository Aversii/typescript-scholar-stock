import { Request, Response } from "express";
import { UpdateUserInputDto, UpdateUserUseCase } from "../../../../../application/useCases/user/update";
import { HttpMethod, Route } from "../../route";
import { UserValidator } from "../../../../../domain/validations/userValidations";
import { CustomError } from "../../../../../error/customError";

export type UpdateUserResponseDTO = {
  message: string;
};

export class UpdateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updateUserService: UpdateUserUseCase
  ) {}

  public static update(updateUserService: UpdateUserUseCase) {
    return new UpdateUserRoute("/users/:id", HttpMethod.PATCH, updateUserService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { id } = request.params;
        const token = request.headers.authorization as string

        const { name, email, password } = request.body;

        const input: UpdateUserInputDto = {
          id,
          name,
          email,
          password,
          token
        };

        const output: UpdateUserResponseDTO =
          await this.updateUserService.execute(input);

        const responseBody = this.present(output);
        response.status(200).json(responseBody).send();
    } catch (error) {
        if (error instanceof CustomError) {
          response.status(error.statusCode).json({ "Error": error.message });
        } else {
          response.status(500).json({ "Error": "Internal Server Error" });
        }
      }
    };
  }

  private present(input: UpdateUserResponseDTO): UpdateUserResponseDTO {
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
