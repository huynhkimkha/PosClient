import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {EmployeeService} from '../../../../../core/services/agency/employee.service';
import {EmployeeModel} from '../../../../../data/schema/employee.model';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';

@Component({
    selector: 'app-add-employee',
    templateUrl: './app-add-employee.component.html'
})
export class AppAddEmployeeComponent implements AfterViewInit {
    public employeeFull: EmployeeModel = new EmployeeModel();
    public employee: EmployeeModel = new EmployeeModel();

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

    public show() {
        this.employeeFull = new EmployeeModel();
        this.employeeFull.birthDate = new Date(Date.now());
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveEmployee() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.employeeService.save(this.employeeFull).subscribe(res => this.saveEmployeeCompleted(res));
    }

    private saveEmployeeCompleted(res: ResponseModel<EmployeeModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm nhân viên thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }
}
