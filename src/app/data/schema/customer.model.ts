export class CustomerModel {
    public id: string;
    public fullName: string;
    public address: string;
    public phone: string;
    public createdDate: string;
    public updatedDate: string;
    public constructor(
        data?: CustomerModel
    ){
        const customer = data == null ? this : data;
        this.id = customer.id;
        this.fullName = customer.fullName;
        this.address = customer.address;
        this.phone = customer.phone;
        this.createdDate = customer.createdDate;
        this.updatedDate = customer.updatedDate;
    }
}
