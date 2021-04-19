export class MaterialModel {
    public id: string;
    public name: string;
    public unit: string;
    public price: number;
    public content: string;

    public constructor(
        data?: MaterialModel
    ){
        const material = data == null ? this : data;
        this.id = material.id;
        this.name = material.name;
        this.unit = material.unit;
        this.price = material.price;
        this.content = material.content;
    }
}
