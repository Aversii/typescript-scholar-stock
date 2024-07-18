
import { Material } from "../../../domain/entities/material";
import { MaterialGateway } from "../../../domain/gateway/materialGateway";
import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";


export type ListByIdMaterialInputDto = {
    id:string;
    token:string;
}

export type ListByIdMaterialOutputDto = {
      id: string;
      name: string;
      quantity: number;
      unitMeasurement: string;
      authorId:string
};

export class ListByIdMaterialUseCase
  implements UseCase<ListByIdMaterialInputDto, ListByIdMaterialOutputDto>
{
  private constructor(private readonly userGateway: MaterialGateway) {}
  public static create(userGateway: MaterialGateway) {
    return new ListByIdMaterialUseCase(userGateway);
  }

  public async execute(input: ListByIdMaterialInputDto): Promise<ListByIdMaterialOutputDto> {
    const tokenData = authenticator.getTokenData(input.token)
    const aMaterial = await this.userGateway.listById(input.id);  
    const output = this.presentOutput(aMaterial);
    return output;
  }

  private presentOutput(m: Material): ListByIdMaterialOutputDto {
    return {
      id: m.getId(),
      name: m.getName(),
      quantity: m.getQuantity(),
      unitMeasurement: m.getUnitMeasurement(),
      authorId: m.getAuthorId()
    };
  }
}
