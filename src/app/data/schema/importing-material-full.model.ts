import {CustomerModel} from './customer.model';
import {ImportingTransactionModel} from './importing-transaction.model';

export class ImportingMaterialFullModel {
    public id: string;
    public customer: CustomerModel;
    public code: string;
    public number: string;
    public description: string;
    public note: string;
    public amount: number;
    public createdDate: string;
    public updatedDate: string;
    public importingTransactionList: ImportingTransactionModel[];

    public constructor(
        data?: ImportingMaterialFullModel
    ){
        const importingMaterialFull = data == null ? this : data;
        this.id = importingMaterialFull.id;
        this.customer = new CustomerModel(importingMaterialFull.customer);
        this.code = importingMaterialFull.code;
        this.number = importingMaterialFull.number;
        this.description = importingMaterialFull.description;
        this.note = importingMaterialFull.note;
        this.amount = importingMaterialFull.amount;
        this.createdDate = importingMaterialFull.createdDate;
        this.updatedDate = importingMaterialFull.updatedDate;
        this.importingTransactionList = [];
        for (const detail of importingMaterialFull.importingTransactionList) {
            this.importingTransactionList.push(new ImportingTransactionModel(detail));
        }
    }

    public getTotal() {
        let total = 0;
        for (const item of this.importingTransactionList) {
            total += item.amount;
        }
        return total;
    }
}
