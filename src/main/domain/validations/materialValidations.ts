import { InvalidRequest_BlankName, InvalidRequest_BlankUnitMeasurement, InvalidRequest_InvalidAuthorIdFormat, InvalidRequest_InvalidNumberType, InvalidRequest_InvalidTextType, InvalidRequest_LowQuantity, InvalidRequest_NameLength } from "../../error/customError"
import { InvalidRequest_BlankAuthorId } from './../../error/customError';

export class MaterialValidations{

    public static validateName(name: string): void {
        if(typeof(name)!=="string"){
            throw new InvalidRequest_InvalidTextType()
        }
        if (!name || name.trim().length === 0 || name ==="") {
            throw new InvalidRequest_BlankName()
        }
        if (name.length < 3|| name.length> 30) {
            throw new InvalidRequest_NameLength()
        }
    }

    public static validateQuantity(quantity:number):void{
        if(typeof(quantity)!=="number"){
            throw new InvalidRequest_InvalidNumberType()
        }
        if(quantity < 0){
            throw new InvalidRequest_LowQuantity()
        }
    }

    public static validateUnitMeasurement(unitMeasurement: string): void {
        if (typeof unitMeasurement !== "string") {
            throw new InvalidRequest_InvalidTextType();
        }
        if (!unitMeasurement || unitMeasurement.trim().length === 0) {
            throw new InvalidRequest_BlankUnitMeasurement();
        }
    }

    public static validateAuthorId(authorId: string): void {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (typeof authorId !== "string") {
            throw new InvalidRequest_InvalidTextType();
        }
        if (!authorId || authorId.trim().length === 0) {
            throw new InvalidRequest_BlankAuthorId();
        }
        if (!uuidRegex.test(authorId)) {
            throw new InvalidRequest_InvalidAuthorIdFormat();
        }
    }

    
}