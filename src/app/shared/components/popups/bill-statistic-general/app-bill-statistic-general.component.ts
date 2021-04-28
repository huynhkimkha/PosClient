import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
import {BillModel} from '../../../../data/schema/bill.model';
import {AppModalWrapperComponent} from '../../modal-wrapper/app-modal-wrapper.component';
import {AppAlert, AppLoading} from '../../../utils';
import {BillService} from '../../../../core/services/agency/bill.service';

@Component({
    selector: 'app-bill-statistic-general',
    templateUrl: './app-bill-statistic-general.component.html'
})
export class AppBillStatisticGeneralComponent implements AfterViewInit {
    public billList: BillModel[] = [];
    public revenueTotal: number;
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private billService: BillService
    ) {
    }

    ngAfterViewInit() {
    }

    public show(billList: BillModel[]) {
        this.billList = billList;
        this.revenueTotal = 0;
        for (const item of this.billList){
            this.revenueTotal += item.amount;
        }
        this.appModalWrapper.show();
    }
}