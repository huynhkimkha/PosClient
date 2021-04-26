import {AfterViewInit, Component} from '@angular/core';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ImportingMaterialModel} from '../../../../data/schema/importing-material.model';
import {ImportingMaterialService} from '../../../../core/services/agency/importing-material.service';

@Component({
    selector: 'app-importing-material',
    templateUrl: './importing-material.component.html'
})
export class ImportingMaterialComponent implements AfterViewInit {
    public search: BaseSearchModel<ImportingMaterialModel[]> = new BaseSearchModel<ImportingMaterialModel[]>();

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private importingMaterialService: ImportingMaterialService
    ) {
    }

    ngAfterViewInit() {
        this.getImportingMaterials();
    }

    public dataTableChange(searchChange: BaseSearchModel<ImportingMaterialModel[]>) {
        this.search = searchChange;
        this.getImportingMaterials();
    }

    public saveImportingMaterialCompleteEvent() {
        this.getImportingMaterials();
    }

    public confirmDelete(importingMaterial: ImportingMaterialModel) {
        this.modal.confirm('Bạn có muốn xóa phiếu nhập và chi phí theo phiếu nhập này?').subscribe(res => this.deleteImportingMaterial(res, importingMaterial));
    }

    private deleteImportingMaterial(state: boolean, importingMaterial: ImportingMaterialModel) {
        if (state) {
            this.loading.show();
            this.importingMaterialService.deleteImportingMaterial(importingMaterial.id)
                .subscribe(res => this.deleteImportingMaterialCompleted(res));
        }
    }

    private deleteImportingMaterialCompleted(res: ResponseModel<boolean>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa phiếu nhập và chi phí theo phiếu nhập thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getImportingMaterials();
    }

    private getImportingMaterials() {
        this.loading.show();
        this.importingMaterialService.find(this.search).subscribe(res => this.getImportingMaterialsCompleted(res));
    }

    private getImportingMaterialsCompleted(res: ResponseModel<BaseSearchModel<ImportingMaterialModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        const importingMaterialList = res.result.result || [];
        this.search = res.result;
        this.search.result = [];
        for (const item of importingMaterialList) {
            this.search.result.push(new ImportingMaterialModel(item));
        }
    }
}
