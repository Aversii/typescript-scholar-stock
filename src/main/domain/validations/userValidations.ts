import { InvalidRequest_BlankName, InvalidRequest_EmailFormat, InvalidRequest_InvalidTextType, InvalidRequest_LongPassword, InvalidRequest_NameLength } from "../../error/customError";
import { InvalidRequest_ShortPassword } from './../../error/customError';

export class UserValidator {
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

    public static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(typeof(email)!=="string"){
            throw new InvalidRequest_InvalidTextType()
        }
        if (!email || !emailRegex.test(email)) {
            throw new InvalidRequest_EmailFormat()
        }
    }

    public static validatePassword(password: string): void {
        if(typeof(password)!=="string"){
            throw new InvalidRequest_InvalidTextType()
        }
        if (!password || password.length < 6) {
            throw new InvalidRequest_ShortPassword()
        }
/*         if(password.length>30){
            throw new InvalidRequest_LongPassword()
        } */
    }
}
