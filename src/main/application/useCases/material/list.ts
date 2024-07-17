import { Material } from "../../../domain/entities/material";
import { MaterialGateway } from "../../../domain/gateway/materialGateway";
import { InvalidRequest_ShortPassword } from "../../../error/customError";
import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";

export type ListMaterialInputDto = {
  token:string
};

export type ListMaterialOutputDto = {
  materials: {
    id: string;
    name: string;
    quantity: number;
    unitMeasurement:string
    authorId:string
  }[],
};

export class ListMaterialUseCase
  implements UseCase<ListMaterialInputDto, ListMaterialOutputDto>
{
  private constructor(private readonly materialGateway: MaterialGateway) {}
  public static create(materialGateway: MaterialGateway) {
    return new ListMaterialUseCase(materialGateway);
  }

  public async execute(tk:ListMaterialInputDto): Promise<ListMaterialOutputDto> {
    const tokenData = authenticator.getTokenData(tk.token)
          if(!tokenData){
        throw new InvalidRequest_ShortPassword()
      }

    const aMaterial = await this.materialGateway.list();
    const output = this.presentOutput(aMaterial);
    return output;
  }

  private presentOutput(materials: Material[]): ListMaterialOutputDto {
    return {
      materials: materials.map((m) => {
        return {
          id: m.getId(),
          name: m.getName(),
          quantity: m.getQuantity(),
          unitMeasurement: m.getUnitMeasurement(),
          authorId: m.getAuthorId()

        };
      }),
    };
  }
}
