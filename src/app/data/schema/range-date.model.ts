export class RangeDateModel {
    public fromDate: number;
    public toDate: number;

    constructor(data?: RangeDateModel) {
        const search = data == null ? this : data;

        this.fromDate = search.fromDate;
        this.toDate = search.toDate;
    }
}
