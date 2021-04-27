export class DateBillModel {
    public date: number;
    public month: number;
    public year: number;
    public total: number;

    constructor(data?: DateBillModel) {
        const dateBill = data == null ? this : data;

        this.date = dateBill.date;
        this.month = dateBill.month;
        this.year = dateBill.year;
        this.total = dateBill.total;
    }
}
