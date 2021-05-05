import {AgencyModel} from "./agency.model";

export class EmployeeModel {
    public id: string;
    public agency: AgencyModel;
    public fullName: string;
    public email: string;
    public password: string;
    public phone: string;
    public birthDate: Date;
    public role: string;

    public constructor(
        data?: EmployeeModel
    ){
        const employee = data == null ? this : data;
        this.id = employee.id;
        this.fullName = employee.fullName;
        this.email = employee.email;
        this.password = employee.password;
        this.phone = employee.phone;
        this.birthDate = employee.birthDate;
        this.role = employee.role;
    }
}
