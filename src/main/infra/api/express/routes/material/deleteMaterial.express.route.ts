import { Request, Response } from "express";

import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";
import { DeleteMaterialInputDto, DeleteMaterialUseCase } from "../../../../../application/useCases/material/delete";

export class DeleteMaterialRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteMaterialService: DeleteMaterialUseCase
  ) {}

  public static delete(deleteMaterialService: DeleteMaterialUseCase) {
    return new DeleteMaterialRoute(
      "/materials/:id",
      HttpMethod.DELETE,
      deleteMaterialService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {

      try {
        
        const id = request.params.id;
        const token = request.headers.authorization as string
        const input: DeleteMaterialInputDto = { id,token };

  
        await this.deleteMaterialService.execute(input);
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
