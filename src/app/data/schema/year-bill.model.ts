export class YearBillModel {
    public year: number;
    public total: number;

    constructor(data?: YearBillModel) {
        const yearBill = data == null ? this : data;

        this.year = yearBill.year;
        this.total = yearBill.total;
    }
}
