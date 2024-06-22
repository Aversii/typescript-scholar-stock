import { User } from "../entities/user";

export interface UserGateway {
    save(user: User):Promise<void>
    list():Promise<User[]>
    listById(id:string):Promise<User>
    delete(id:string):Promise<void>
}