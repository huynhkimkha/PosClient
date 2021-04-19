export class CostCategoryModel {
    public id: string;
    public name: string;

    public constructor(
        data?: CostCategoryModel
    ){
        const costCategory = data == null ? this : data;
        this.id = costCategory.id;
        this.name = costCategory.name;
    }
}
