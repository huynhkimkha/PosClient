import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {AgencyModel} from '../../../../../data/schema/agency.model';
import {AgencyService} from '../../../../../core/services/agency/agency.service';

@Component({
    selector: 'app-update-agency',
    templateUrl: './app-update-agency.component.html'
})
export class AppUpdateAgencyComponent implements AfterViewInit {
    public agency: AgencyModel = new AgencyModel();

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private agencyService: AgencyService
    ) {
    }

    ngAfterViewInit() {
    }

    public show(agency: AgencyModel) {
        this.agency = new AgencyModel(agency);
        this.loadAgency();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveAgency() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.agencyService.update(this.agency).subscribe(res => this.saveAgencyCompleted(res));
    }

    private saveAgencyCompleted(res: ResponseModel<AgencyModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật chi nhánh thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    private loadAgency() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.agencyService.findOne(this.agency.id).subscribe(res => this.loadAgencyCompleted(res));
    }

    private loadAgencyCompleted(res: ResponseModel<AgencyModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.agency = new AgencyModel(res.result);
    }
}
