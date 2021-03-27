export class BaseSearchModel<T> {
    public currentPage = 0;
    public recordOfPage = 10;
    public totalRecords: number;
    public sortAsc: boolean;
    public sortBy: string;
    public pagingRange = 5;
    public result: T;
    public createdDateSort: string;

    constructor(data?: BaseSearchModel<T>) {
        const baseSearch = data == null ? this : data;
        this.result = baseSearch.result;
    }
}
