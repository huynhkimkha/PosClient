import {MaterialModel} from './material.model';
import {ImportingMaterialModel} from './importing-material.model';

export class ImportingTransactionModel {
    public id: string;
    public importingMaterial: ImportingMaterialModel;
    public material: MaterialModel;
    public quantity: number;
    public price: number;
    public amount: number;

    public constructor(
        data?: ImportingTransactionModel
    ){
        const importingTransaction = data == null ? this : data;
        this.id = importingTransaction.id;
        this.importingMaterial = new ImportingMaterialModel(importingTransaction.importingMaterial);
        this.material = new MaterialModel(importingTransaction.material);
        this.quantity = importingTransaction.quantity;
        this.price = importingTransaction.price;
        this.amount = importingTransaction.amount;
    }
}
