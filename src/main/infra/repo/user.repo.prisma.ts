import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../domain/gateway/userGateway";
import { User } from "../../domain/entities/user";

export class UserRepositoryPrisma implements UserGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new UserRepositoryPrisma(prismaClient);
  }

  public async save(user: User): Promise<void> {
    const data = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
    };

    await this.prismaClient.user.create({
      data,
    });
  }

  public async list(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany();
    const userList = users.map((u) => {
      const user = User.with({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
      });
      return user;
    });
    return userList;
  }

  public async listById(id: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return User.with({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  public async delete(id: string): Promise<void> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.prismaClient.user.delete({
      where: { id: id },
    });
  }
  
public async update( updatedData: {id: string, name?: string; email?: string; password?: string }): Promise<void> {
  const user = await this.prismaClient.user.findUnique({
    where: { id: updatedData.id },
  });

  if (!user) {
    throw new Error(`User with id ${updatedData.id} not found`);
  }

  const updatedUser = await this.prismaClient.user.update({
    where: { id: updatedData.id },
    data: {
      name: updatedData.name || user.name,
      email: updatedData.email || user.email,
      password: updatedData.password || user.password,
    },
  });
}

}