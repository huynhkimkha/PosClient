export class YearCostModel {
    public year: number;
    public total: number;

    constructor(data?: YearCostModel) {
        const yearCost = data == null ? this : data;

        this.year = yearCost.year;
        this.total = yearCost.total;
    }
}
