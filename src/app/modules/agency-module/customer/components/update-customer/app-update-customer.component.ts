import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CustomerModel} from '../../../../../data/schema/customer.model';
import {CustomerService} from '../../../../../core/services/agency/customer.service';
import {CUSTOMER_TYPE_CONSTANT} from '../../../../../core/constant/customer-type.constant';
@Component({
    selector: 'app-update-customer',
    templateUrl: './app-update-customer.component.html'
})
export class AppUpdateCustomerComponent implements AfterViewInit {
    public customer: CustomerModel = new CustomerModel();
    public CUSTOMER_TYPE_CONSTANT = CUSTOMER_TYPE_CONSTANT;

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private customerService: CustomerService
    ) {
    }

    ngAfterViewInit() {
    }

    public show(customer: CustomerModel) {
        this.customer = new CustomerModel(customer);
        this.loadCustomer();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCustomer() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.customerService.update(this.customer).subscribe(res => this.saveCustomerCompleted(res));
    }

    private saveCustomerCompleted(res: ResponseModel<CustomerModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật khách hàng thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    private loadCustomer() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.customerService.findOne(this.customer.id).subscribe(res => this.loadCustomerCompleted(res));
    }

    private loadCustomerCompleted(res: ResponseModel<CustomerModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.customer = new CustomerModel(res.result);
    }
}
