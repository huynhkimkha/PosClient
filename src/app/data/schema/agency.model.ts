export class AgencyModel {
    public id: string;
    public name: string;
    public address: string;
    public orgCode: string;

    public constructor(
        data?: AgencyModel
    ){
        const agency = data == null ? this : data;
        this.id = agency.id;
        this.name = agency.name;
        this.address = agency.address;
        this.orgCode = agency.orgCode;
    }
}
