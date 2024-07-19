import { InvalidRequest_BlankName, InvalidRequest_InvalidNumberType, InvalidRequest_InvalidTextType, InvalidRequest_LowQuantity, InvalidRequest_NameLength } from "../../error/customError"

export class MaterialValidations{

    public static validateName(name: string): void {
        if(typeof(name)!=="string"){
            throw new InvalidRequest_InvalidTextType()
        }
        if (!name || name.trim().length === 0 || name ==="") {
            throw new InvalidRequest_BlankName()
        }
        if (name.length < 3) {
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
}