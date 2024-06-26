import { UserGateway } from "../../../domain/gateway/userGateway";
import { UseCase } from "../../gateway/useCaseGateway";

export type UpdateUserInputDto = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};

export type UpdateUserOutputDto = {
  message: string;
};

export class UpdateUserUseCase
  implements UseCase<UpdateUserInputDto, UpdateUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new UpdateUserUseCase(userGateway);
  }

  public async execute({
    id,
    name,
    email,
    password,
  }: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
    const user = await this.userGateway.listById(id);

    await this.userGateway.update({ id, name, email, password });

    const output = this.presentOutput("User updated successfully");
    return output;
  }

  private presentOutput(message: string): UpdateUserOutputDto {
    return { message };
  }
}
