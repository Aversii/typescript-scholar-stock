import { Request, Response } from "express";
import {
  ListByIdUserUseCase,
  ListByIdUserInputDto,
  ListByIdUserOutputDto,
} from "./../../../../../application/useCases/user/listById";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";

export type ListByIdResponseDTO = {
  id: string;
  name: string;
  email: string;
};

export class ListByIdUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getUserByIdService: ListByIdUserUseCase
  ) {}

  public static listById(getUserByIdService: ListByIdUserUseCase) {
    return new ListByIdUserRoute(
      "/users/:id",
      HttpMethod.GET,
      getUserByIdService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const token = request.headers.authorization as string
        const { id } = request.params;
        const input: ListByIdUserInputDto = { id,token };
        const output = await this.getUserByIdService.execute(input);

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

  private present(input: ListByIdUserOutputDto): ListByIdUserOutputDto {
    const response: ListByIdResponseDTO = {
      id: input.id,
      name: input.name,
      email: input.email,
    };
    return response;
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
