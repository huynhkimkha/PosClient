export class MonthBillModel {
    public monthDate: number;
    public yearDate: number;
    public total: number;

    constructor(data?: MonthBillModel) {
        const monthBill = data == null ? this : data;

        this.monthDate = monthBill.monthDate;
        this.yearDate = monthBill.yearDate;
        this.total = monthBill.total;
    }
}
