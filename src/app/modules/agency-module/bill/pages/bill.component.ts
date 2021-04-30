import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {BillModel} from '../../../../data/schema/bill.model';
import {BillService} from '../../../../core/services/agency/bill.service';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html'
})
export class BillComponent implements AfterViewInit {
    public searchData: BaseSearchModel<BillModel[]> = new BaseSearchModel<BillModel[]>();

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private route: ActivatedRoute,
        private router: Router,
        private billService: BillService,
    ) {
    }

    ngAfterViewInit(): void {
        this.searchData.createdDateSort = 'desc';
        this.searchBill();
    }

    public showAll() {
        this.searchData = new BaseSearchModel<BillModel[]>();
        this.searchData.createdDateSort = 'desc';
        this.searchBill();
    }

    public searchCompletedEvent(event) {
        this.searchData = new BaseSearchModel<BillModel[]>(event);
        this.searchBill();
    }

    public createdDateSort() {
        if (this.searchData.createdDateSort === 'desc') {
            this.searchData.createdDateSort = 'asc';
            this.billService.find(this.searchData).subscribe(res => this.searchBillCompleted(res));
            return;
        } else {
            this.searchData.createdDateSort = 'desc';
            this.billService.find(this.searchData).subscribe(res => this.searchBillCompleted(res));
            return;
        }
    }

    public searchBill() {
        this.loading.show();
        this.billService.find(this.searchData).subscribe(res => this.searchBillCompleted(res));
    }

    public dataTableChange(searchChange: BaseSearchModel<BillModel[]>) {
        this.searchData = searchChange;
        this.searchBill();
    }

    public saveBillCompleteEvent() {
        this.searchBill();
    }

    public confirmDelete(id: string) {
        this.modal.confirm('Bạn có muốn xóa hoá đơn?').subscribe(res => this.deleteBill(res, id));
    }

    private searchBillCompleted(res: ResponseModel<BaseSearchModel<BillModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        const orderLst = res.result.result || [];
        this.searchData = res.result;
        this.searchData.result = [];
        for (const item of orderLst) {
            this.searchData.result.push(new BillModel(item));
        }
    }

    private deleteBill(state: boolean, id) {
        if (state) {
            this.loading.show();
            this.billService.deleteBill(id).subscribe(res => this.deleteBillCompleted(res));
        }
    }

    private deleteBillCompleted(res: ResponseModel<BillModel>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa hóa dơn thành công!');
        if (this.searchData.result.length === 1) {
            this.searchData.currentPage = this.searchData.currentPage - 1;
        }
        this.searchBill();
    }

    public addBill() {
        const page = this.searchData.currentPage + 1;
        this.router.navigateByUrl('/add-bill');
    }

}
