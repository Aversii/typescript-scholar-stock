import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/userGateway";
import { InvalidRequest_ShortPassword } from "../../../error/customError";
import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";

export type ListUserInputDto = {
  token:string
};

export type ListUserOutputDto = {
  users: {
    id: string;
    name: string;
    email: string;
  }[],
};

export class ListUserUseCase
  implements UseCase<ListUserInputDto, ListUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}
  public static create(userGateway: UserGateway) {
    return new ListUserUseCase(userGateway);
  }

  public async execute(tk:ListUserInputDto): Promise<ListUserOutputDto> {
    const tokenData = authenticator.getTokenData(tk.token)
          if(!tokenData){
        throw new InvalidRequest_ShortPassword()
      }

    const aUser = await this.userGateway.list();
    const output = this.presentOutput(aUser);
    return output;
  }

  private presentOutput(users: User[]): ListUserOutputDto {
    return {
      users: users.map((u) => {
        return {
          id: u.getId(),
          name: u.getName(),
          email: u.getEmail(),
        };
      }),
    };
  }
}
