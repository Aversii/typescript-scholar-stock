import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/userGateway";
import { UseCase } from "../../gateway/useCaseGateway";


export type ListByIdUserInputDto = {
    id:string
}

export type ListByIdUserOutputDto = {
      id: string;
      name: string;
      email: string;
};

export class ListByIdUserUseCase
  implements UseCase<ListByIdUserInputDto, ListByIdUserOutputDto>
{
  private constructor(private readonly productGateway: UserGateway) {}
  public static create(productGateway: UserGateway) {
    return new ListByIdUserUseCase(productGateway);
  }

  public async execute(input: ListByIdUserInputDto): Promise<ListByIdUserOutputDto> {
    const aUser = await this.productGateway.listById(input.id);  
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
