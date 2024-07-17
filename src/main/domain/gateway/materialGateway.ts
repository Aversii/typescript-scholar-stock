import { Material } from "../entities/material";

export interface MaterialGateway{
    save(material: Material):Promise<void>
    list():Promise<Material[]>
    //listById(id:string):Promise<Material>
    //delete(id:string):Promise<void>
    //update(updatedData: { id: string; name?: string; quantity?: number; unitMeasurement?: string }): Promise<void>;
    //listByLowest(): Promise<Material[]>;
}