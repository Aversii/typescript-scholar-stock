import { PrismaClient } from "@prisma/client";
import { Material } from "../../domain/entities/material";
import { MaterialGateway } from "../../domain/gateway/materialGateway";

export class MaterialRepositoryPrisma implements MaterialGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}
  
    public static create(prismaClient: PrismaClient) {
      return new MaterialRepositoryPrisma(prismaClient);
    }
  
    public async save(material: Material): Promise<void> {
      const data = {
        id: material.getId(),
        name: material.getName(),
        quantity: material.getQuantity(),
        unitMeasurement: material.getUnitMeasurement(),
        authorId: material.getAuthorId()
      };
  
      await this.prismaClient.material.create({
        data,
      });
    }

    public async list(): Promise<Material[]> {
        const materials = await this.prismaClient.material.findMany();
        const materialList = materials.map((m) => {
          const material = Material.with({
            id: m.id,
            name: m.name,
            quantity: m.quantity,
            unitMeasurement: m.unitMeasurement,
            authorId: m.authorId
          });
          return material;
        });
        return materialList;
      }
}