import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {EmployeeModel} from '../../../../../data/schema/employee.model';
import {EmployeeService} from '../../../../../core/services/agency/employee.service';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {ROLE_CONSTANT} from '../../../../../core/constant/role.constant';

@Component({
    selector: 'app-update-employee',
    templateUrl: './app-update-employee.component.html'
})
export class AppUpdateEmployeeComponent implements AfterViewInit {
    public employeeFull: EmployeeModel = new EmployeeModel();
    public employeeSelect: EmployeeModel = new EmployeeModel();
    public employee: EmployeeModel = new EmployeeModel();
    public roleEnum = ROLE_CONSTANT;

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private employeeService: EmployeeService
    ) {
    }

    ngAfterViewInit() {
    }

    public show(employee: EmployeeModel) {
        this.employeeSelect = new EmployeeModel(employee);
        this.loadEmployee();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveEmployee() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.employeeService.update(this.employeeFull).subscribe(res => this.saveEmployeeCompleted(res));
    }

    private saveEmployeeCompleted(res: ResponseModel<EmployeeModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật nhân viên thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    private loadEmployee() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.employeeService.findOne(this.employeeSelect.id).subscribe(res => this.loadEmployeeCompleted(res));
    }

    private loadEmployeeCompleted(res: ResponseModel<EmployeeModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.employeeFull = new EmployeeModel(res.result);
    }
}
