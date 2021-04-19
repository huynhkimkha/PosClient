import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {InventoryModel} from '../../../../data/schema/inventory.model';
import {InventoryService} from '../../../../core/services/agency/inventory.service';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html'
})
export class InventoryComponent implements AfterViewInit {
    public search: BaseSearchModel<InventoryModel[]> = new BaseSearchModel<InventoryModel[]>();
    private inventoryId: string;

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private inventoryService: InventoryService
    ) {
    }

    ngAfterViewInit() {
        this.getInventorys();
        this.inventoryId = '';
    }

    public saveInventoryCompleteEvent() {
        this.getInventorys();
    }

    public dataTableChange(searchChange: BaseSearchModel<InventoryModel[]>) {
        this.search = searchChange;
        this.getInventorys();
    }

    public confirmDelete(agency: InventoryModel) {
        this.modal.confirm('Bạn có muốn xóa nguyên liệu?').subscribe(res => this.deleteInventory(res, agency));
    }

    private deleteInventory(state: boolean, agency: InventoryModel) {
        if (state) {
            this.loading.show();
            this.inventoryId = agency.id;
            this.inventoryService.deleteInventory(this.inventoryId).subscribe(ress => this.deleteInventoryCompleted(ress));
        }
    }

    private getInventorys() {
        this.loading.show();
        this.inventoryService.find(this.search).subscribe(res => this.getInventorysCompleted(res));
    }

    private getInventorysCompleted(res: ResponseModel<BaseSearchModel<InventoryModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.search = res.result;
    }

    private deleteInventoryCompleted(ress: ResponseModel<InventoryModel>) {
        this.loading.hide();
        if (ress.status !== HTTP_CODE_CONSTANT.OK) {
            ress.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa nguyên liệu thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getInventorys();
    }
}
