import { Request, Response } from "express";

import { DeleteUserInputDto, DeleteUserUseCase } from "../../../../../application/useCases/user/delete";
import { HttpMethod, Route } from "../../route";

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
        const input: DeleteUserInputDto = { id };
  
        await this.deleteUserService.execute(input);
        response.status(204).send();
      } catch (error:any) {
        response.status(400).json({"Error":error.message}).send();        
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
