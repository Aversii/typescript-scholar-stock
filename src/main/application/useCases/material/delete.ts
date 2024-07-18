import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";
import { InvalidRequest_ShortPassword } from './../../../error/customError';
import { MaterialGateway } from './../../../domain/gateway/materialGateway';

export type DeleteMaterialInputDto = {
    id:string
    token:string
}
export type DeleteMaterialOutputDto = void;

export class DeleteMaterialUseCase implements UseCase<DeleteMaterialInputDto,DeleteMaterialOutputDto>{
    private constructor(private readonly materialGateway: MaterialGateway) {}
    public static create(materialGateway: MaterialGateway) {
      return new DeleteMaterialUseCase(materialGateway);
    }
  
    public async execute(input: DeleteMaterialInputDto): Promise<DeleteMaterialOutputDto> {
      const tokenData = authenticator.getTokenData(input.token)
      if(!tokenData){
        throw new InvalidRequest_ShortPassword
      }
      await this.materialGateway.listById(input.id);
      await this.materialGateway.delete(input.id);        
    }

}
  

