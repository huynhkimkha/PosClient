import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {BillModel} from '../../../../../data/schema/bill.model';
import {BillFullModel} from '../../../../../data/schema/bill-full.model';
import {BillService} from '../../../../../core/services/agency/bill.service';

@Component({
    selector: 'app-view-bill',
    templateUrl: './app-view-bill.component.html'
})
export class AppViewBillComponent implements AfterViewInit {
    public bill: BillFullModel = new BillFullModel();
    private billId: string;

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private billService: BillService
    ) {

    }

    ngAfterViewInit() {
    }

    public show(bill: BillModel) {
        this.billId = bill.id;
        this.getBillFull();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public getBillFull() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.billService.getFullbyId(this.billId).subscribe(res => this.getBillFullCompleted(res));
    }

    private getBillFullCompleted(res: ResponseModel<BillFullModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.bill = new BillFullModel(res.result);
    }
    public formatDate(inputDate: string) {
        const formattedDate = new Date(inputDate);
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
    }
}
