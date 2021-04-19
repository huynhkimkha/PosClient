import {CUSTOMER_TYPE_CONSTANT} from '../../core/constant/customer-type.constant';

export class CustomerModel {
    public id: string;
    public customerType: string;
    public fullName: string;
    public address: string;
    public phone: string;
    public birthDate: Date;

    public constructor(
        data?: CustomerModel
    ){
        const customer = data == null ? this : data;
        this.id = customer.id;
        this.customerType = customer.customerType;
        this.fullName = customer.fullName;
        this.address = customer.address;
        this.phone = customer.phone;
        this.birthDate = customer.birthDate;
    }
}
