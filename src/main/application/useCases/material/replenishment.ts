import { Material } from "../../../domain/entities/material";
import { MaterialGateway } from "../../../domain/gateway/materialGateway";
import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway"

export type ReplenishmentMaterialInputDto = {
    token:string
  };
  

export type ReplenishmentMaterialOutputDto={
    materials:{
        id:string
        name:string
        quantity:number
        unitMeasurement:string  
        authorId:string
    }[],
}

export class ReplenishmentMaterialUseCase implements UseCase<ReplenishmentMaterialInputDto,ReplenishmentMaterialOutputDto>{
    private constructor(private readonly materialGateway: MaterialGateway) {}
    public static create(materialGateway: MaterialGateway) {
      return new ReplenishmentMaterialUseCase(materialGateway);
    }
    public async execute(input: ReplenishmentMaterialInputDto): Promise<ReplenishmentMaterialOutputDto> {
        const token = authenticator.getTokenData(input.token)
        const list = await this.materialGateway.listByLowest()
        
        const output = this.presentOutput(list);
        return output;


    }
    private presentOutput(materials: Material[]): ReplenishmentMaterialOutputDto {
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