import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {BillModel} from '../../../../../data/schema/bill.model';
import {BillService} from '../../../../../core/services/agency/bill.service';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppBillStatisticGeneralComponent} from '../../../../../shared/components/popups/bill-statistic-general/app-bill-statistic-general.component';

@Component({
    selector: 'app-bill-statistic',
    templateUrl: './app-bill-statistic.component.html'
})
export class AppBillStatisticComponent implements AfterViewInit {
    public billList: BillModel[] = [];
    public fromDate: string;
    public toDate: string;
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;
    @ViewChild('appBillStatisticGeneral', { static: true }) appBillStatisticGeneral: AppBillStatisticGeneralComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private billService: BillService
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
        const toDate = String(today.getDate() + 1).padStart(2, '0');
        this.toDate = yyyy + '-' + mm + '-' + toDate;
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
        this.billService.getBillStatistic(rangeDate).subscribe(res => this.statisticCompleted(res));
    }

    private statisticCompleted(res: ResponseModel<BillModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thống kê chi phí thành công!');
        this.billList = res.result;
        this.appBillStatisticGeneral.show(this.billList);
        this.appModalWrapper.hide();
    }
}
