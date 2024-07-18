import { Material } from "../../../domain/entities/material";
import { MaterialGateway } from "../../../domain/gateway/materialGateway";
import { UseCase } from "../../gateway/useCaseGateway";

export type CreateMaterialInputDto = {
  name: string;
  quantity: number;
  unitMeasurement: string;
  authorId:string
  token: string

};

export type CreateMaterialOutputDto = {
  message: string;
};

export class CreateMaterialUseCase implements UseCase<CreateMaterialInputDto, CreateMaterialOutputDto>{
  
  private constructor(private readonly materialGateway: MaterialGateway) {}

  public static create(materialGateway: MaterialGateway) {
    return new CreateMaterialUseCase(materialGateway);
  }

  public async execute({name,quantity,unitMeasurement,authorId}: CreateMaterialInputDto): Promise<CreateMaterialOutputDto> {
    const material = Material.create(name,quantity,unitMeasurement,authorId)
    await this.materialGateway.save(material)    
    const output = this.presentOutput("Material created sucessfully");
    return output
      
  }

  private presentOutput(message:string):CreateMaterialOutputDto{
    return {message}
  }

}
