import { MaterialGateway } from "../../../domain/gateway/materialGateway";
import { MaterialValidations } from "../../../domain/validations/materialValidations";
import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";

export type UpdateMaterialInputDto = {
  id: string;
  name?: string;
  quantity?: number;
  unitMeasurement?: string;
  token:string
};

export type UpdateMaterialOutputDto = {
  message: string;
};

export class UpdateMaterialUseCase
  implements UseCase<UpdateMaterialInputDto, UpdateMaterialOutputDto>
{
  private constructor(private readonly materialGateway: MaterialGateway) {}

  public static create(materialGateway: MaterialGateway) {
    return new UpdateMaterialUseCase(materialGateway);
  }

  public async execute({id,name,quantity,unitMeasurement,token}: UpdateMaterialInputDto): Promise<UpdateMaterialOutputDto> {
    const tokenData = authenticator.getTokenData(token)
    name && MaterialValidations.validateName(name);
    quantity && MaterialValidations.validateQuantity(quantity);
    unitMeasurement && MaterialValidations.validateUnitMeasurement(unitMeasurement);
    await this.materialGateway.listById(id);
    await this.materialGateway.update({ id, name, quantity, unitMeasurement});

    const output = this.presentOutput("Material updated successfully");
    return output;
  }

  private presentOutput(message: string): UpdateMaterialOutputDto {
    return { message };
  }
}
