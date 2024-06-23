import { Request, Response } from "express";
import {
  ListByIdUserUseCase,
  ListByIdUserInputDto,
  ListByIdUserOutputDto,
} from "./../../../../../application/useCases/user/listById";
import { HttpMethod, Route } from "../../route";

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
        const { id } = request.params;
        const input: ListByIdUserInputDto = { id };
        const output = await this.getUserByIdService.execute(input);

        const responseBody = this.present(output);
        response.status(200).json(responseBody).send();
      } catch (error:any) {
        response.status(400).json({"Error":error.message}).send();        
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
