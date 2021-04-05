import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {AgencyService} from '../../../../core/services/agency/agency.service';
import {AgencyModel} from '../../../../data/schema/agency.model';

@Component({
    selector: 'app-agency',
    templateUrl: './agency.component.html'
})
export class AgencyComponent implements AfterViewInit {
    public search: BaseSearchModel<AgencyModel[]> = new BaseSearchModel<AgencyModel[]>();
    private agencyId: string;

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private agencyService: AgencyService
    ) {
    }

    ngAfterViewInit() {
        this.getAgencys();
        this.agencyId = '';
    }

    public saveAgencyCompleteEvent() {
        this.getAgencys();
    }

    public dataTableChange(searchChange: BaseSearchModel<AgencyModel[]>) {
        this.search = searchChange;
        this.getAgencys();
    }

    public confirmDelete(agency: AgencyModel) {
        this.modal.confirm('Bạn có muốn xóa chi nhánh?').subscribe(res => this.deleteAgency(res, agency));
    }

    private deleteAgency(state: boolean, agency: AgencyModel) {
        if (state) {
            this.loading.show();
            this.agencyId = agency.id;
            this.agencyService.deleteAgency(this.agencyId).subscribe(ress => this.deleteAgencyCompleted(ress));
        }
    }

    private getAgencys() {
        this.loading.show();
        this.agencyService.find(this.search).subscribe(res => this.getAgencysCompleted(res));
    }

    private getAgencysCompleted(res: ResponseModel<BaseSearchModel<AgencyModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.search = res.result;
    }

    private deleteAgencyCompleted(ress: ResponseModel<AgencyModel>) {
        this.loading.hide();
        if (ress.status !== HTTP_CODE_CONSTANT.OK) {
            ress.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa chi nhánh thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getAgencys();
    }
}
