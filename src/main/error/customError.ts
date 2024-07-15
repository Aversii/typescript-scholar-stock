export class CustomError extends Error {
    constructor(public statusCode:number, message:string) {
      super(message);
    };;
};;

export class InvalidRequest_BlankName extends CustomError{ 
    constructor(){
        super(422,"Name can't be blank or empty.");
    };;
};;

export class InvalidRequest_NameLength extends CustomError{ 
    constructor(){
        super(422,"Name must be at least 3 characters long.");
    };;
}

export class InvalidRequest_EmailFormat extends CustomError{ 
    constructor(){
        super(422,"Invalid email format.");
    };;
}

export class InvalidRequest_ShortPassword extends CustomError{ 
    constructor(){
        super(422,"Password must be at least 6 characters long.");
    };;
}

export class NotFound_IdNotFound extends CustomError{ 
    constructor(){
        super(404,"ID not found.");
    };;
}

export class NotFound_EmailNotFound extends CustomError{ 
    constructor(){
        super(404,"Email not found.");
    };;
}

export class Unauthorized_PasswordMismatch extends CustomError{ 
    constructor(){
        super(401,"Password Mismatch");
    };;
}