import { UserGateway } from "../../../domain/gateway/userGateway";
import { UseCase } from "../../gateway/useCaseGateway";

export type DeleteUserInputDto = {
    id:string
}
export type DeleteUserOutputDto = void;

export class DeleteUserUseCase implements UseCase<DeleteUserInputDto,DeleteUserOutputDto>{
    private constructor(private readonly userGateway: UserGateway) {}
    public static create(userGateway: UserGateway) {
      return new DeleteUserUseCase(userGateway);
    }
  
    public async execute(input: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
      const aUser = await this.userGateway.delete(input.id);  
    }

}
  

