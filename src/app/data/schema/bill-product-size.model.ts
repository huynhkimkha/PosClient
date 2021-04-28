import {BillModel} from './bill.model';
import {ProductSizeModel} from './product-size.model';

export class BillProductSizeModel {
    public id: string;
    public bill: BillModel;
    public productSize: ProductSizeModel;
    public price: number;
    public quantity: number;

    public constructor(
        data?: BillProductSizeModel
    ){
        const billProductSize = data == null ? this : data;
        this.id = billProductSize.id;
        this.bill = new BillModel(billProductSize.bill);
        this.productSize = new ProductSizeModel(billProductSize.productSize);
        this.price = billProductSize.price;
        this.quantity =  billProductSize.quantity;
    }
}
