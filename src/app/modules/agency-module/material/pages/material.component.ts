import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {MaterialModel} from '../../../../data/schema/material.model';
import {MaterialService} from '../../../../core/services/agency/material.service';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html'
})
export class MaterialComponent implements AfterViewInit {
    public search: BaseSearchModel<MaterialModel[]> = new BaseSearchModel<MaterialModel[]>();
    private materialId: string;

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private materialService: MaterialService
    ) {
    }

    ngAfterViewInit() {
        this.getMaterials();
        this.materialId = '';
    }

    public saveMaterialCompleteEvent() {
        this.getMaterials();
    }

    public dataTableChange(searchChange: BaseSearchModel<MaterialModel[]>) {
        this.search = searchChange;
        this.getMaterials();
    }

    public confirmDelete(agency: MaterialModel) {
        this.modal.confirm('Bạn có muốn xóa nguyên liệu?').subscribe(res => this.deleteMaterial(res, agency));
    }

    private deleteMaterial(state: boolean, agency: MaterialModel) {
        if (state) {
            this.loading.show();
            this.materialId = agency.id;
            this.materialService.deleteMaterial(this.materialId).subscribe(ress => this.deleteMaterialCompleted(ress));
        }
    }

    private getMaterials() {
        this.loading.show();
        this.materialService.find(this.search).subscribe(res => this.getMaterialsCompleted(res));
    }

    private getMaterialsCompleted(res: ResponseModel<BaseSearchModel<MaterialModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.search = res.result;
    }

    private deleteMaterialCompleted(ress: ResponseModel<MaterialModel>) {
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
        this.getMaterials();
    }
}
