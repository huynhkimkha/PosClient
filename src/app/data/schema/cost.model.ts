import {CostCategoryModel} from './cost-category.model';

export class CostModel {
    public id: string;
    public costCategory: CostCategoryModel;
    public code: string;
    public number: string;
    public amount: number;
    public description: string;
    public createdDate: string;
    public updatedDate: string;

    public constructor(
        data?: CostModel
    ){
        const cost = data == null ? this : data;
        this.id = cost.id;
        this.costCategory = new CostCategoryModel(cost.costCategory);
        this.code = cost.code;
        this.number = cost.number;
        this.amount = cost.amount;
        this.description = cost.description;
        this.createdDate = cost.createdDate;
        this.updatedDate = cost.updatedDate;
    }
}
