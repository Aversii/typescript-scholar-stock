import { Request, Response } from "express";

export type HttpMethod = 'get'|'post'|'delete';
export const HttpMethod={
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
    DELETE:"delete" as HttpMethod
}as const

export interface Route{
    getHandler():(request:Request,response:Response)=>Promise<void>
    getPath():string
    getMethod():HttpMethod
}