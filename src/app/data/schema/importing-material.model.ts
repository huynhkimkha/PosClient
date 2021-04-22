import {CustomerModel} from './customer.model';

export class ImportingMaterialModel {
    public id: string;
    public customer: CustomerModel;
    public code: string;
    public number: string;
    public description: string;
    public note: string;
    public amount: number;
    public createdDate: string;
    public updatedDate: string;

    public constructor(
        data?: ImportingMaterialModel
    ){
        const importingMaterial = data == null ? this : data;
        this.id = importingMaterial.id;
        this.customer = new CustomerModel(importingMaterial.customer);
        this.code = importingMaterial.code;
        this.number = importingMaterial.number;
        this.description = importingMaterial.description;
        this.note = importingMaterial.note;
        this.amount = importingMaterial.amount;
        this.createdDate = importingMaterial.createdDate;
        this.updatedDate = importingMaterial.updatedDate;
    }
}
