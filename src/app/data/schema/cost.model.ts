export class CostModel {
    public id: string;
    public typeCost: string;
    public amount: number;
    public description: string;

    public constructor(
        data?: CostModel
    ){
        const agency = data == null ? this : data;
        this.id = agency.id;
        this.typeCost = agency.typeCost;
        this.amount = agency.amount;
        this.description = agency.description;
    }
}
