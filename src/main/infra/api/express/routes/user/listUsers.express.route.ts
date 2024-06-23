import { Request, Response } from "express";
import { ListUserOutputDto, ListUserUseCase } from "../../../../../application/useCases/user/list";
import { HttpMethod, Route } from "../../route";

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
        const output = await this.listUserService.execute();  
        const responseBody = this.present(output);
        response.status(200).json(responseBody).send();        
      } catch (error:any) {
        response.status(400).json({"Error":error.message}).send();        
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
