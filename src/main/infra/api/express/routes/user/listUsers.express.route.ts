import { Request, Response } from "express";
import { ListUserOutputDto, ListUserUseCase } from "../../../../../application/useCases/user/list";
import { HttpMethod, Route } from "../../route";
import { CustomError } from "../../../../../error/customError";

export type ListUserResponseDTO = {
  users: { id: string; name: string; email: string;}[];
};

export class ListUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserService: ListUserUseCase
  ) {}

  public static list(listUserService: ListUserUseCase) {
    return new ListUserRoute(
      "/users",
      HttpMethod.GET,
      listUserService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      try {
        const token = request.headers.authorization as string

        const output = await this.listUserService.execute({token});  
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

  private present(input: ListUserOutputDto): ListUserResponseDTO {
    const response: ListUserResponseDTO = {
      users: input.users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
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
