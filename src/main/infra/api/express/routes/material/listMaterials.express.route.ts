import { Request, Response } from "express";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";
import { ListMaterialOutputDto, ListMaterialUseCase } from "../../../../../application/useCases/material/list";

export type ListMaterialResponseDTO = {
  materials: { id: string; name: string; quantity: number, unitMeasurement:string, authorId:string;}[];
};

export class ListMaterialRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listMaterialService: ListMaterialUseCase
  ) {}

  public static list(listMaterialService: ListMaterialUseCase) {
    return new ListMaterialRoute(
      "/materials",
      HttpMethod.GET,
      listMaterialService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const token = request.headers.authorization as string

        const output = await this.listMaterialService.execute({token});  
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

  private present(input: ListMaterialOutputDto): ListMaterialResponseDTO {
    const response: ListMaterialResponseDTO = {
      materials: input.materials.map((m) => ({
        id: m.id,
        name: m.name,
        quantity: m.quantity,
        unitMeasurement: m.unitMeasurement,
        authorId: m.authorId 
      })),
    };
    return response
  }
  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
