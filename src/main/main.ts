import { CreateUserUseCase } from "./application/useCases/user/create";
import { DeleteUserUseCase } from "./application/useCases/user/delete";
import { ListUserUseCase } from "./application/useCases/user/list";
import { ListByIdUserUseCase } from "./application/useCases/user/listById";
import { ApiExpress } from "./infra/api/express/api.express";
import { CreateUserRoute } from "./infra/api/express/routes/user/createUser.express.route";
import { ListByIdUserRoute } from "./infra/api/express/routes/user/listByIdUsers.express.route";
import { ListUserRoute } from "./infra/api/express/routes/user/listUsers.express.route";
import { prismaClient } from "./package/prisma/prisma";
import { DeleteUserRoute } from "./infra/api/express/routes/user/deleteUser.express.route";
import { UpdateUserUseCase } from "./application/useCases/user/update";
import { UpdateUserRoute } from "./infra/api/express/routes/user/updateUser.express.route";
import { LoginUserUseCase } from "./application/useCases/user/login";
import { UserRepositoryPrisma } from "./infra/repo/user.repo.prisma";
import { CreateMaterialUseCase } from "./application/useCases/material/create";
import { MaterialRepositoryPrisma } from "./infra/repo/material.repo.prisma";
import { CreateMaterialRoute } from "./infra/api/express/routes/material/createMaterial.express.route";
import { ListMaterialUseCase } from "./application/useCases/material/list";
import { ListMaterialRoute } from "./infra/api/express/routes/material/listMaterials.express.route";
import { DeleteMaterialUseCase } from './application/useCases/material/delete';
import { DeleteMaterialRoute } from './infra/api/express/routes/material/deleteMaterial.express.route';
import { UpdateMaterialRoute } from "./infra/api/express/routes/material/updateMaterial.express.route";
import { UpdateMaterialUseCase } from "./application/useCases/material/update";
import { ListByIdMaterialUseCase } from './application/useCases/material/listById';
import { ListByIdMaterialRoute } from "./infra/api/express/routes/material/listByIdMaterial.express.route";
import { LoginUserRoute } from "./infra/api/express/routes/user/loginUser.express.route";
import { ReplenishmentMaterialUseCase } from './application/useCases/material/replenishment';
import { ListReplenishmentRoute } from "./infra/api/express/routes/material/listReplenishment.express.route";

function main() {
  const repository = UserRepositoryPrisma.create(prismaClient);
  const materialRepo = MaterialRepositoryPrisma.create(prismaClient);

  const createUserUseCase = CreateUserUseCase.create(repository);
  const listUserUseCase = ListUserUseCase.create(repository);
  const listByIdUserUseCase = ListByIdUserUseCase.create(repository);
  const deleteUserUseCase = DeleteUserUseCase.create(repository);
  const updateUserUseCase = UpdateUserUseCase.create(repository);
  const loginUserUseCase = LoginUserUseCase.login(repository);

  const createMaterialUseCase = CreateMaterialUseCase.create(materialRepo);
  const listMaterialUseCase = ListMaterialUseCase.create(materialRepo);
  const deleteMaterialUseCase = DeleteMaterialUseCase.create(materialRepo)
  const updateMaterialUseCase = UpdateMaterialUseCase.create(materialRepo)
  const listByIdMaterialUseCase = ListByIdMaterialUseCase.create(materialRepo)
  const replenishmentMaterialUseCase = ReplenishmentMaterialUseCase.create(materialRepo)

  const createRoute = CreateUserRoute.create(createUserUseCase);
  const listRoute = ListUserRoute.list(listUserUseCase);
  const listByIdRoute = ListByIdUserRoute.listById(listByIdUserUseCase);
  const deleteRoute = DeleteUserRoute.deleteUser(deleteUserUseCase);
  const updateRoute = UpdateUserRoute.update(updateUserUseCase);
  const loginRoute = LoginUserRoute.login(loginUserUseCase);

  const createMaterialRoute = CreateMaterialRoute.create(createMaterialUseCase);
  const listMaterialRoute = ListMaterialRoute.list(listMaterialUseCase);
  const deleteMaterialRoute = DeleteMaterialRoute.delete(deleteMaterialUseCase)
  const updateMaterialRoute = UpdateMaterialRoute.update(updateMaterialUseCase)
  const listByIdMaterialRoute = ListByIdMaterialRoute.listById(listByIdMaterialUseCase)
  const listReplenishmentRoute = ListReplenishmentRoute.ListReplenishment(replenishmentMaterialUseCase)

  const api = ApiExpress.create([
    createRoute,
    loginRoute,
    listRoute,
    listByIdRoute,
    deleteRoute,
    updateRoute,
    createMaterialRoute,
    listMaterialRoute,
    deleteMaterialRoute,
    updateMaterialRoute,
    listByIdMaterialRoute,
    listReplenishmentRoute
  ]);
  const port = 8000;
  api.start(port);
}

main();
