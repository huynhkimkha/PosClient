import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {CostModel} from '../../../../data/schema/cost.model';
import {CostService} from '../../../../core/services/agency/cost.service';

@Component({
    selector: 'app-cost',
    templateUrl: './cost.component.html'
})
export class CostComponent implements AfterViewInit {
    public search: BaseSearchModel<CostModel[]> = new BaseSearchModel<CostModel[]>();
    private agencyId: string;

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private agencyService: CostService
    ) {
    }

    ngAfterViewInit() {
        this.getCosts();
        this.agencyId = '';
    }

    public saveCostCompleteEvent() {
        this.getCosts();
    }

    public dataTableChange(searchChange: BaseSearchModel<CostModel[]>) {
        this.search = searchChange;
        this.getCosts();
    }

    public confirmDelete(agency: CostModel) {
        this.modal.confirm('Bạn có muốn xóa chi phí?').subscribe(res => this.deleteCost(res, agency));
    }

    private deleteCost(state: boolean, agency: CostModel) {
        if (state) {
            this.loading.show();
            this.agencyId = agency.id;
            this.agencyService.deleteCost(this.agencyId).subscribe(ress => this.deleteCostCompleted(ress));
        }
    }

    private getCosts() {
        this.loading.show();
        this.agencyService.find(this.search).subscribe(res => this.getCostsCompleted(res));
    }

    private getCostsCompleted(res: ResponseModel<BaseSearchModel<CostModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.search = res.result;
    }

    private deleteCostCompleted(ress: ResponseModel<CostModel>) {
        this.loading.hide();
        if (ress.status !== HTTP_CODE_CONSTANT.OK) {
            ress.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa chi phí thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getCosts();
    }
}
