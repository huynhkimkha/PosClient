import {MaterialModel} from './material.model';

export class InventoryModel {
    public id: string;
    public material: MaterialModel;
    public amount: number;
    public amountCheck: number;
    public description: string;
    public createdDate: string;
    public updatedDate: string;
    public constructor(
        data?: InventoryModel
    ){
        const inventory = data == null ? this : data;
        this.id = inventory.id;
        this.material = new MaterialModel(inventory.material);
        this.amount = inventory.amount;
        this.amountCheck = inventory.amountCheck;
        this.description = inventory.description;
        this.createdDate = inventory.createdDate;
        this.updatedDate = inventory.updatedDate;
    }
}
