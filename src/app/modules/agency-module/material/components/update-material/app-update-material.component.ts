import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {MaterialModel} from '../../../../../data/schema/material.model';
import {MaterialService} from '../../../../../core/services/agency/material.service';

@Component({
    selector: 'app-update-material',
    templateUrl: './app-update-material.component.html'
})
export class AppUpdateMaterialComponent implements AfterViewInit {
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

    public show(material: MaterialModel) {
        this.material = new MaterialModel(material);
        this.loadMaterial();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveMaterial() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.materialService.update(this.material).subscribe(res => this.saveMaterialCompleted(res));
    }

    private saveMaterialCompleted(res: ResponseModel<MaterialModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật nguyên liệu thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    private loadMaterial() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.materialService.findOne(this.material.id).subscribe(res => this.loadMaterialCompleted(res));
    }

    private loadMaterialCompleted(res: ResponseModel<MaterialModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.material = new MaterialModel(res.result);
    }
}
