export type MaterialProps = {
    id: string,
    name: string,
    quantity: number,
    unitMeasurement: string
    authorId:string

}

export class Material {
    private constructor(private props: MaterialProps) {}

    public static create(name: string, quantity: number, unitMeasurement: string,authorId:string) {
        return new Material({
            id: crypto.randomUUID().toString(),
            name,
            quantity,
            unitMeasurement,
            authorId

        });
    }

    public static with(props: MaterialProps) {
        return new Material(props);
    }

    public getId(): string {
        return this.props.id;
    }

    public getName(): string {
        return this.props.name;
    }

    public getQuantity(): number {
        return this.props.quantity;
    }

    public getUnitMeasurement(): string {
        return this.props.unitMeasurement;
    }

    public getAuthorId(): string {
        return this.props.authorId;
    }

    public setName(name: string): void {
        this.props.name = name;
    }

    public setQuantity(quantity: number): void {
        this.props.quantity = quantity;
    }

    public setUnitMeasurement(unitMeasurement: string): void {
        this.props.unitMeasurement = unitMeasurement;
    }

    public setAuthorId(authorId:string):void{
        this.props.authorId = authorId
    }
}
