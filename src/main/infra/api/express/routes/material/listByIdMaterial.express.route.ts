import { Request, Response } from "express";

import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";
import { ListByIdMaterialInputDto, ListByIdMaterialOutputDto, ListByIdMaterialUseCase } from "../../../../../application/useCases/material/listById";

export type ListByIdResponseDTO = {
  id: string;
  name: string;
  quantity: number;
  unitMeasurement: string
  authorId:string
};

export class ListByIdMaterialRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getMaterialByIdService: ListByIdMaterialUseCase
  ) {}

  public static listById(getMaterialByIdService: ListByIdMaterialUseCase) {
    return new ListByIdMaterialRoute(
      "/materials/:id",
      HttpMethod.GET,
      getMaterialByIdService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const token = request.headers.authorization as string
        const { id } = request.params;
        const input: ListByIdMaterialInputDto = { id,token };
        const output = await this.getMaterialByIdService.execute(input);

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

  private present(input: ListByIdMaterialOutputDto): ListByIdMaterialOutputDto {
    const response: ListByIdResponseDTO = {
      id: input.id,
      name: input.name,
      quantity: input.quantity,
      unitMeasurement: input.unitMeasurement,
      authorId: input.authorId
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
