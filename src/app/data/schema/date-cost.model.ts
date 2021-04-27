export class DateCostModel {
    public date: number;
    public month: number;
    public year: number;
    public total: number;

    constructor(data?: DateCostModel) {
        const dateCost = data == null ? this : data;

        this.date = dateCost.date;
        this.month = dateCost.month;
        this.year = dateCost.year;
        this.total = dateCost.total;
    }
}
