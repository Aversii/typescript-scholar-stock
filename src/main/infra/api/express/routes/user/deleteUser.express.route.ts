import { Request, Response } from "express";

import { DeleteUserInputDto, DeleteUserUseCase } from "../../../../../application/useCases/user/delete";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";

export class DeleteUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteUserService: DeleteUserUseCase
  ) {}

  public static deleteUser(deleteUserService: DeleteUserUseCase) {
    return new DeleteUserRoute(
      "/users/:id",
      HttpMethod.DELETE,
      deleteUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {

      try {
        
        const id = request.params.id;
        const token = request.headers.authorization as string
        const input: DeleteUserInputDto = { id,token };

  
        await this.deleteUserService.execute(input);
        response.status(204).send();
      } catch (error) {
        if (error instanceof CustomError) {
          response.status(error.statusCode).json({ "Error": error.message });
        } else {
          response.status(500).json({ "Error": "Internal Server Error" });
        }
      }
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
