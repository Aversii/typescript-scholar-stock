import { UserGateway } from "../../../domain/gateway/userGateway";
import { Unauthorized_PasswordMismatch } from "../../../error/customError";
import hashManager from "../../../infra/service/hashManager/hashManager";
import Authenticator from "../../../infra/service/jwtAuth/authenticator";
import { UseCase } from "../../gateway/useCaseGateway";

export type LoginUserInputDto = {
  email: string;
  password: string;
};

export type LoginUserOutputDto = {
  message: string;
  token: string;
};

export class LoginUserUseCase implements UseCase<LoginUserInputDto, LoginUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static login(userGateway: UserGateway) {
    return new LoginUserUseCase(userGateway);
  }

  public async execute(input: LoginUserInputDto): Promise<LoginUserOutputDto> {

    const user = await this.userGateway.login(input.email, input.password);
    if(user){
      const hashCompare = await hashManager.compareHash(input.password,user?.getPassword())    
      if (!hashCompare) {
        throw new Unauthorized_PasswordMismatch();
      }
      const token = Authenticator.generateToken({ id: user.getId() });
      const output = this.presentOutput("User Has Login", token);
      return output;
    }else{
      throw new Error("User not found");    }


  }

  private presentOutput(message: string, token: string): LoginUserOutputDto {
    return { message, token };
  }
}
