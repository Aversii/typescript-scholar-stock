import { Request, Response } from "express";
import { CreateMaterialInputDto, CreateMaterialUseCase } from "../../../../../application/useCases/material/create";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";
import authenticator from "../../../../service/jwtAuth/authenticator";

export type CreateMaterialResponseDTO = {
  message: string;
};

export class CreateMaterialRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createMaterialService: CreateMaterialUseCase
  ) {}

  public static create(createMaterialService: CreateMaterialUseCase) {
    return new CreateMaterialRoute("/materials/create", HttpMethod.POST, createMaterialService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const { name, quantity,unitMeasurement } = request.body;
        const token = request.headers.authorization as string
        const tokenData = authenticator.getTokenData(token)
        const authorId = tokenData.id

        const input: CreateMaterialInputDto = {
          name,
          quantity,
          unitMeasurement,
          authorId,
          token
        };

        const output: CreateMaterialResponseDTO =
          await this.createMaterialService.execute(input);

        const responseBody = this.present(output);
        response.status(201).json(responseBody);
      } catch (error) {
        if (error instanceof CustomError) {
          response.status(error.statusCode).json({ "Error": error.message });
        } else {
          response.status(500).json(error);
        }
      }
    };
  }

  private present(data: CreateMaterialResponseDTO): CreateMaterialResponseDTO {
    return { message: data.message};
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
