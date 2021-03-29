import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {CustomerModel} from '../../../../data/schema/customer.model';
import {CustomerService} from '../../../../core/services/agency/customer.service';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements AfterViewInit {
    public search: BaseSearchModel<CustomerModel[]> = new BaseSearchModel<CustomerModel[]>();
    private customerId: string;

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private customerService: CustomerService
    ) {
    }

    ngAfterViewInit() {
        this.getCustomers();
        this.customerId = '';
    }

    public saveCustomerCompleteEvent() {
        this.getCustomers();
    }

    public dataTableChange(searchChange: BaseSearchModel<CustomerModel[]>) {
        this.search = searchChange;
        this.getCustomers();
    }

    public confirmDelete(customer: CustomerModel) {
        this.modal.confirm('Bạn có muốn xóa khách hàng?').subscribe(res => this.deleteCustomer(res, customer));
    }

    private deleteCustomer(state: boolean, customer: CustomerModel) {
        if (state) {
            this.loading.show();
            this.customerId = customer.id;
            this.customerService.deleteCustomer(this.customerId).subscribe(ress => this.deleteCustomerCompleted(ress));
        }
    }

    private getCustomers() {
        this.loading.show();
        this.customerService.find(this.search).subscribe(res => this.getCustomersCompleted(res));
    }

    private getCustomersCompleted(res: ResponseModel<BaseSearchModel<CustomerModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.search = res.result;
    }

    private deleteCustomerCompleted(ress: ResponseModel<CustomerModel>) {
        this.loading.hide();
        if (ress.status !== HTTP_CODE_CONSTANT.OK) {
            ress.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa khách hàng thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getCustomers();
    }
}
