import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/userGateway";
import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";


export type ListByIdUserInputDto = {
    id:string;
    token:string;
}

export type ListByIdUserOutputDto = {
      id: string;
      name: string;
      email: string;
};

export class ListByIdUserUseCase
  implements UseCase<ListByIdUserInputDto, ListByIdUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}
  public static create(userGateway: UserGateway) {
    return new ListByIdUserUseCase(userGateway);
  }

  public async execute(input: ListByIdUserInputDto): Promise<ListByIdUserOutputDto> {
    const tokenData = authenticator.getTokenData(input.token)
    const aUser = await this.userGateway.listById(input.id);  
    const output = this.presentOutput(aUser);
    return output;
  }

  private presentOutput(u: User): ListByIdUserOutputDto {
    return {
      id: u.getId(),
      name: u.getName(),
      email: u.getEmail(),
    };
  }
}
