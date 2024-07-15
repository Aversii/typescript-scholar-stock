import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../domain/gateway/userGateway";
import { User } from "../../domain/entities/user";
import {
  NotFound_EmailNotFound,
  NotFound_IdNotFound,
  Unauthorized_PasswordMismatch,
} from "../../error/customError";
import { UserValidator } from "./../../domain/validations/userValidations";

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
      throw new NotFound_IdNotFound();
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
      throw new NotFound_IdNotFound();
    }

    await this.prismaClient.user.delete({
      where: { id: id },
    });
  }

  public async update(updatedData: {
    id: string;
    name?: string;
    email?: string;
    password?: string;
  }): Promise<void> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: updatedData.id },
    });

    if (!user) {
      throw new NotFound_IdNotFound();
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


  public async login(email: string, password: string): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new NotFound_EmailNotFound();
    }

    if (user.password !== password) {
      throw new Unauthorized_PasswordMismatch();
    }

    return User.with({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
