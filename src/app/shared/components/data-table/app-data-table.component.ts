import {OnChanges, Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';

@Component({
    selector: 'app-data-table',
    templateUrl: './app-data-table.component.html'
})
export class AppDataTableComponent implements OnChanges {
    @Input() dataTable: BaseSearchModel<any> = null;

    @Input() dataOnly = false;
    @Input() showPaging = true;
    @Input() showEntries = true;
    @Input() showDetail = true;
    @Input() columnNumber: number;
    @Output() changeEvent = new EventEmitter<any>();

    public totalPage: number;
    public pageRange: number[] = new Array<number>();

    constructor(

    ) {
    }

    ngOnChanges() {
        this.init();
    }

    public isNoRecord(): boolean {
        if (this.dataOnly) {
            return false;
        }

        if (this.dataTable == null) {
            return false;
        }

        return this.dataTable.totalRecords == null || this.dataTable.totalRecords === 0;
    }

    public activePage(pageNumber: number) {
        if (this.dataTable.currentPage === pageNumber) {
            return 'active';
        }
    }

    public disableFirstPaging() {
        if (this.dataTable.currentPage + 1 === 1) {
            return 'disabled';
        }
    }

    public disableLastPaging() {
        if (this.dataTable.currentPage + 1 === this.totalPage) {
            return 'disabled';
        }
    }

    public selectPage(page: number) {
        if (page > this.totalPage) {
            this.dataTable.currentPage = this.totalPage - 1;
            return;
        }

        if (page < 0) {
            this.dataTable.currentPage = 0;
            return;
        }

        this.dataTable.currentPage = page;

        this.generateRangePage();

        this.changeEvent.emit(this.dataTable);
    }

    public selectEntries() {
        this.init();

        this.changeEvent.emit(this.dataTable);
    }

    public showFirstLast() {
        return this.dataTable.pagingRange < this.totalPage;
    }

    private init() {
        if (this.dataTable == null) {
            this.dataTable = new BaseSearchModel<any>();
            return;
        }

        this.pageRange = [];
        this.calTotalPage();
        this.generateRangePage();
    }

    private calTotalPage() {
        if (this.dataTable.totalRecords < this.dataTable.recordOfPage) {
            this.totalPage = 1;
        }

        const totalPage: number = this.dataTable.totalRecords / this.dataTable.recordOfPage;
        this.totalPage = (this.dataTable.totalRecords % this.dataTable.recordOfPage) === 0
            ? Math.trunc(totalPage)
            : Math.trunc(totalPage) + 1;
    }

    private generateRangePage() {
        const currentPage = this.dataTable.currentPage + 1;
        const pagingRange = this.dataTable.pagingRange;

        if (this.pageRange.length === 0) {
            if (pagingRange < this.totalPage) {
                this.pageRange = this.rangeFromTo(1, pagingRange);
            }
            else {
                this.pageRange = this.rangeFromTo(1, this.totalPage);
            }
        }


        const filter = this.pageRange.filter( num => num === currentPage);
        if (filter.length) {
            return;
        }

        if (currentPage > this.pageRange[pagingRange - 1]) {
            this.pageRange = this.rangeFromTo(currentPage - (pagingRange - 1), currentPage);
            return;
        }

        if (currentPage < this.pageRange[0]) {
            this.pageRange = this.rangeFromTo(currentPage, currentPage + (pagingRange - 1));
            return;
        }
    }

    private rangeFromTo(from: number, to: number) {
        const range = [];
        while (from <= to) {
            range.push(from);
            ++from;
        }
        return range;
    }
}
