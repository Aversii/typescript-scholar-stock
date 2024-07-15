import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/userGateway";
import hashManager from "../../../infra/service/hashManager/hashManager";
import Authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";

export type CreateUserInputDto = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutputDto = {
  message: string;
  token: string
};

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutputDto>{
  
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new CreateUserUseCase(userGateway);
  }

  public async execute({name,email,password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const hash = await hashManager.generateHash(password)
    
    const user = User.create(name,email,hash)
    await this.userGateway.save(user)
    const token = Authenticator.generateToken({id: user.getId()})
    
    const output = this.presentOutput("User created sucessfully",token);
    return output
      
  }

  private presentOutput(message:string, token:string):CreateUserOutputDto{
    return {message,token}
  }

}
