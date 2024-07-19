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

export class InvalidRequest_JWTIsMissing extends CustomError{ 
    constructor(){
        super(422,"Token is missing.");
    };;
}

export class InvalidRequest_InvalidToken extends CustomError{ 
    constructor(){
        super(422,"Invalid Token.");
    };;
}

export class InvalidRequest_LowQuantity extends CustomError{ 
    constructor(){
        super(422,"Quantity cant be negative.");
    };;
}

export class InvalidRequest_InvalidTextType extends CustomError{ 
    constructor(){
        super(422,"This data must be a string.");
    };;
}

export class InvalidRequest_InvalidNumberType extends CustomError{ 
    constructor(){
        super(422,"This data must be a number positive.");
    };;
}


export class InvalidRequest_LongPassword extends CustomError{ 
    constructor(){
        super(422,"Password must be lower than 30 characters.");
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