import { Request, Response } from "express";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";
import { UpdateMaterialInputDto, UpdateMaterialUseCase } from "../../../../../application/useCases/material/update";

export type UpdateMaterialResponseDTO = {
  message: string;
};

export class UpdateMaterialRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updateMaterialService: UpdateMaterialUseCase
  ) {}

  public static update(updateMaterialService: UpdateMaterialUseCase) {
    return new UpdateMaterialRoute("/material/:id", HttpMethod.PATCH, updateMaterialService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { id } = request.params;
        const token = request.headers.authorization as string

        const { name, quantity, unitMeasurement } = request.body;

        const input: UpdateMaterialInputDto = {
          id,
          name,
          quantity,
          unitMeasurement,
          token
        };

        const output: UpdateMaterialResponseDTO =
          await this.updateMaterialService.execute(input);

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

  private present(input: UpdateMaterialResponseDTO): UpdateMaterialResponseDTO {
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
