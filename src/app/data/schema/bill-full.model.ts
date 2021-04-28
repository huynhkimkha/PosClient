import {PromotionModel} from './promotion.model';
import {AgencyModel} from './agency.model';
import {BillProductSizeModel} from './bill-product-size.model';
import {EmployeeModel} from './employee.model';

export class BillFullModel {
    public id: string;
    public name: string;
    public status: string;
    public employee: EmployeeModel;
    public promotion: PromotionModel;
    public agency: AgencyModel;
    public code: string;
    public number: string;
    public description: string;
    public note: string;
    public amount: number;
    public createdDate: string;
    public updatedDate: string;
    public billProductSizeList: BillProductSizeModel[];

    public constructor(
        data?: BillFullModel
    ){
        const billFull = data == null ? this : data;
        this.id = billFull.id;
        this.name = billFull.name;
        this.status = billFull.status;
        this.employee = new EmployeeModel(billFull.employee);
        this.promotion = new PromotionModel(billFull.promotion);
        this.agency = new AgencyModel(billFull.agency);
        this.code = billFull.code;
        this.number = billFull.number;
        this.description = billFull.description;
        this.note = billFull.note;
        this.amount = billFull.amount;
        this.createdDate = billFull.createdDate;
        this.updatedDate = billFull.updatedDate;
        this.billProductSizeList = [];
        for (const detail of billFull.billProductSizeList) {
            this.billProductSizeList.push(new BillProductSizeModel(detail));
        }
    }
    public getTotal() {
        let total = 0;
        for (const item of this.billProductSizeList) {
            if (item.price){
                total += item.price;
            }
        }
        return total;
    }
}
