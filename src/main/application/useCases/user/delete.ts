import { UserGateway } from "../../../domain/gateway/userGateway";
import authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";
import { InvalidRequest_ShortPassword } from './../../../error/customError';

export type DeleteUserInputDto = {
    id:string
    token:string
}
export type DeleteUserOutputDto = void;

export class DeleteUserUseCase implements UseCase<DeleteUserInputDto,DeleteUserOutputDto>{
    private constructor(private readonly userGateway: UserGateway) {}
    public static create(userGateway: UserGateway) {
      return new DeleteUserUseCase(userGateway);
    }
  
    public async execute(input: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
      const tokenData = authenticator.getTokenData(input.token)
      if(!tokenData){
        throw new InvalidRequest_ShortPassword
      }
      await this.userGateway.listById(input.id);
      await this.userGateway.delete(input.id);        
    }

}
  

