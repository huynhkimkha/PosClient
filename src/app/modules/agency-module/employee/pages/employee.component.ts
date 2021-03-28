import {AfterViewInit, Component} from '@angular/core';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {EmployeeService} from '../../../../core/services/agency/employee.service';
import {EmployeeModel} from '../../../../data/schema/employee.model';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'
})
export class EmployeeComponent implements AfterViewInit {
    public search: BaseSearchModel<EmployeeModel[]> = new BaseSearchModel<EmployeeModel[]>();
    private employeeId: string;
    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private employeeService: EmployeeService
    ) {

    }

    ngAfterViewInit() {
        this.getEmployees();
        this.employeeId = '';
    }

    public saveEmployeeCompleteEvent() {
        this.getEmployees();
    }

    public dataTableChange(searchChange: BaseSearchModel<EmployeeModel[]>) {
        this.search = searchChange;
        this.getEmployees();
    }

    public confirmDelete(employee: EmployeeModel) {
        this.modal.confirm('Bạn có muốn xóa nhân viên?').subscribe(res => this.deleteEmployee(res, employee));
    }

    private deleteEmployee(state: boolean, employee: EmployeeModel) {
        if (state) {
            this.loading.show();
            this.employeeId = employee.id;
            this.employeeService.deleteEmployee(this.employeeId).subscribe(ress => this.deleteEmployeeCompleted(ress));
        }
    }

    private getEmployees() {
        this.loading.show();
        this.employeeService.find(this.search).subscribe(res => this.getEmployeesCompleted(res));
    }

    private getEmployeesCompleted(res: ResponseModel<BaseSearchModel<EmployeeModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.search = res.result;
    }

    private deleteEmployeeCompleted(ress: ResponseModel<EmployeeModel>) {
        this.loading.hide();
        if (ress.status !== HTTP_CODE_CONSTANT.OK) {
            ress.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa nhân viên thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getEmployees();
    }
}
