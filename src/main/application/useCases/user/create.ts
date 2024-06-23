import { User } from "../../../domain/entities/user";
import { UserGateway } from "../../../domain/gateway/userGateway";
import { UseCase } from "../../gateway/useCaseGateway";

export type CreateUserInputDto = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutputDto = {
  message: string;
};

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutputDto>{
  
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new CreateUserUseCase(userGateway);
  }

  public async execute({name,email,password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const user = User.create(name,email,password)
    await this.userGateway.save(user)
    
    const output = this.presentOutput("User created sucessfully");
    return output
      
  }

  private presentOutput(message:string):CreateUserOutputDto{
    return {message}
  }

}
