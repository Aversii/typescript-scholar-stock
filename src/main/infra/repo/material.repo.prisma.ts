import { PrismaClient } from "@prisma/client";
import { Material } from "../../domain/entities/material";
import { MaterialGateway } from "../../domain/gateway/materialGateway";
import { NotFound_IdNotFound } from "../../error/customError";

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

      public async listById(id: string): Promise<Material> {
        const material = await this.prismaClient.material.findUnique({
          where: { id: id },
        });
    
        if (!material) {
          throw new NotFound_IdNotFound();
        }
    
        return Material.with({
          id: material.id,
          name: material.name,
          quantity: material.quantity,
          unitMeasurement: material.unitMeasurement,
          authorId:material.unitMeasurement
        });
      }

      public async delete(id: string): Promise<void> {
        const material = await this.prismaClient.material.findUnique({
          where: { id: id },
        });
    
        await this.prismaClient.material.delete({
          where: { id: id },
        });
      }

      public async update(updatedData: {
        id: string;
        name?: string;
        quantity?: number;
        unitMeasurement?: string;
      }): Promise<void> {
        const material = await this.prismaClient.material.findUnique({
          where: { id: updatedData.id },
        });
    
    
        const updatedMaterial = await this.prismaClient.material.update({
          where: { id: updatedData.id },
          data: {
            name: updatedData.name || material?.name,
            quantity: updatedData.quantity || material?.quantity,
            unitMeasurement: updatedData.unitMeasurement || material?.unitMeasurement,
          },
        });
      }
}