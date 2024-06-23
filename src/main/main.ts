import { CreateUserUseCase } from "./application/useCases/user/create";
import { DeleteUserUseCase } from "./application/useCases/user/delete";
import { ListUserUseCase } from "./application/useCases/user/list";
import { ListByIdUserUseCase } from "./application/useCases/user/listById";
import { ApiExpress } from "./infra/api/express/api.express";
import { CreateUserRoute } from "./infra/api/express/routes/user/createUser.express.route";
import { ListByIdUserRoute } from "./infra/api/express/routes/user/listByIdUsers.express.route";
import { ListUserRoute } from "./infra/api/express/routes/user/listUsers.express.route";
import { UserRepositoryPrisma } from "./infra/repo/user.repo.prisma";
import { prismaClient } from "./package/prisma/prisma";
import { DeleteUserRoute } from './infra/api/express/routes/user/deleteUser.express.route';

function main() {
  const repository = UserRepositoryPrisma.create(prismaClient);

  const createUserUseCase = CreateUserUseCase.create(repository);
  const listUserUseCase = ListUserUseCase.create(repository)
  const listByIdUserUseCase = ListByIdUserUseCase.create(repository)
  const deleteUserUseCase = DeleteUserUseCase.create(repository) 

  const createRoute = CreateUserRoute.create(createUserUseCase);
  const listRoute = ListUserRoute.list(listUserUseCase)
  const listByIdRoute = ListByIdUserRoute.listById(listByIdUserUseCase)
  const deleteRoute = DeleteUserRoute.deleteUser(deleteUserUseCase)

  const api = ApiExpress.create([createRoute,listRoute,listByIdRoute,deleteRoute]);
  const port = 8000;
  api.start(port);
}

main();
