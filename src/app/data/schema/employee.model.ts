export class EmployeeModel {
    public id: string;
    public fullName: string;
    public email: string;
    public password: string;
    public birthDate: Date;

    public constructor(
        data?: EmployeeModel
    ){
        const employee = data == null ? this : data;
        this.id = employee.id;
        this.fullName = employee.fullName;
        this.email = employee.email;
        this.password = employee.password;
        this.birthDate = employee.birthDate;
    }
}
