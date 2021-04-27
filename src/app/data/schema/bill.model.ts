import {PromotionModel} from './promotion.model';
import {AgencyModel} from './agency.model';
import {EmployeeModel} from './employee.model';
import {CustomerModel} from './customer.model';

export class BillModel {
    public id: string;
    public employee: EmployeeModel;
    public customer: CustomerModel;
    public promotion: PromotionModel;
    public agency: AgencyModel;
    public code: string;
    public number: string;
    public description: string;
    public note: string;
    public amount: number;
    public createdDate: string;
    public updatedDate: string;

    public constructor(
        data?: BillModel
    ){
        const billFull = data == null ? this : data;
        this.id = billFull.id;
        this.employee = new EmployeeModel(billFull.employee);
        this.customer = new CustomerModel(billFull.customer);
        this.promotion = new PromotionModel(billFull.promotion);
        this.agency = new AgencyModel(billFull.agency);
        this.code = billFull.code;
        this.number = billFull.number;
        this.description = billFull.description;
        this.note = billFull.note;
        this.amount = billFull.amount;
        this.createdDate = billFull.createdDate;
        this.updatedDate = billFull.updatedDate;
    }
}
