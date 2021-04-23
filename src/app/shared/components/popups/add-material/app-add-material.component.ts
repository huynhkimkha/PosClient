import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../utils';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../modal-wrapper/app-modal-wrapper.component';
import {MaterialModel} from '../../../../data/schema/material.model';
import {MaterialService} from '../../../../core/services/agency/material.service';

@Component({
    selector: 'app-add-material',
    templateUrl: './app-add-material.component.html'
})
export class AppAddMaterialComponent implements AfterViewInit {
    public material: MaterialModel = new MaterialModel();

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private materialService: MaterialService
    ) {

    }

    ngAfterViewInit() {
    }

    public show() {
        this.material = new MaterialModel();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveMaterial() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.materialService.save(this.material).subscribe(res => this.saveMaterialCompleted(res));
    }

    private saveMaterialCompleted(res: ResponseModel<MaterialModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm nguyên liệu thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }
}
