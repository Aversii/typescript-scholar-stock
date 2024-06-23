import { InvalidRequest_BlankName, InvalidRequest_EmailFormat, InvalidRequest_NameLength } from "../../error/customError";
import { InvalidRequest_ShortPassword } from './../../error/customError';

export class UserValidator {
    public static validateName(name: string): void {
        if (!name || name.trim().length === 0 || name ==="") {
            throw new InvalidRequest_BlankName()
        }
        if (name.length < 3) {
            throw new InvalidRequest_NameLength()
        }
    }

    public static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new InvalidRequest_EmailFormat()
        }
    }

    public static validatePassword(password: string): void {
        if (!password || password.length < 6) {
            throw new InvalidRequest_ShortPassword()
        }
    }
}
