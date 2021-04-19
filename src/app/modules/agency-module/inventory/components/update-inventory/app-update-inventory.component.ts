import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {InventoryModel} from '../../../../../data/schema/inventory.model';
import {InventoryService} from '../../../../../core/services/agency/inventory.service';
import {MaterialModel} from '../../../../../data/schema/material.model';
import {MaterialService} from '../../../../../core/services/agency/material.service';

@Component({
    selector: 'app-update-inventory',
    templateUrl: './app-update-inventory.component.html'
})
export class AppUpdateInventoryComponent implements AfterViewInit {
    public inventory: InventoryModel = new InventoryModel();
    public material: MaterialModel = new MaterialModel();
    public materialList: MaterialModel[] = [];

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private inventoryService: InventoryService,
        private materialService: MaterialService
    ) {

    }

    ngAfterViewInit() {
    }

    public show(inventory: InventoryModel) {
        this.inventory = new InventoryModel(inventory);
        this.material = new MaterialModel(this.inventory.material);
        console.log(this.material);
        console.log(this.inventory);

        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public searchMaterial(event) {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.materialService.getLikeName(event.query).subscribe(res => this.searchMaterialComplete(res));
    }

    public saveInventory() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.inventory.material = this.material || new MaterialModel();
        this.inventoryService.update(this.inventory).subscribe(res => this.saveInventoryCompleted(res));
    }

    private searchMaterialComplete(res: ResponseModel<MaterialModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.materialList = res.result || [];
    }

    private saveInventoryCompleted(res: ResponseModel<InventoryModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật tồn kho thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }
}
