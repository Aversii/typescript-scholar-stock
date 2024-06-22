export type UserProps = {
    id: string,
    name:string,
    email:string,
    password:string
}

export class User {
    private constructor(private props:UserProps){}

    public static create(name:string, email:string, password:string){
        return new User({
            id: crypto.randomUUID().toString(),
            name,
            email,
            password
        })
    }

    public static with(props:UserProps){
        return new User(props)
    }

    public getId(): string {
        return this.props.id;
    }

    public getName(): string {
        return this.props.name;
    }

    public getEmail(): string {
        return this.props.email;
    }

    public getPassword(): string {
        return this.props.password;
    }

    public setName(name: string): void {
        this.props.name = name;
    }

    public setEmail(email: string): void {
        this.props.email = email;
    }

    public setPassword(password: string): void {
        this.props.password = password;
    }

}