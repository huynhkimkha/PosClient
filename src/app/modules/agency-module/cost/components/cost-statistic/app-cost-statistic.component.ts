import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CostModel} from '../../../../../data/schema/cost.model';
import {CostService} from '../../../../../core/services/agency/cost.service';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppCostStatisticGeneralComponent} from '../../../../../shared/components/popups/cost-statistic-general/app-cost-statistic-general.component';

@Component({
    selector: 'app-cost-statistic',
    templateUrl: './app-cost-statistic.component.html'
})
export class AppCostStatisticComponent implements AfterViewInit {
    public costList: CostModel[] = [];
    public fromDate: string;
    public toDate: string;
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;
    @ViewChild('appCostStatisticGeneral', { static: true }) appCostStatisticGeneral: AppCostStatisticGeneralComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private costService: CostService
    ) {

    }

    ngAfterViewInit() {
    }

    public show() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        this.fromDate = yyyy + '-' + mm + '-' + dd;
        this.toDate = yyyy + '-' + mm + '-' + dd;
        this.appModalWrapper.show();

    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public statistic(){
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        const startDate = new Date(this.fromDate);
        const endDate = new Date(this.toDate);
        const rangeDate = {
            fromDate: startDate.getTime(),
            toDate: endDate.getTime()
        };
        this.costService.getCostStatistic(rangeDate).subscribe(res => this.statisticCompleted(res));
    }

    private statisticCompleted(res: ResponseModel<CostModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thống kê chi phí thành công!');
        this.costList = res.result;
        this.appCostStatisticGeneral.show(this.costList);
        this.appModalWrapper.hide();
    }
}
