import {AfterViewInit, Component} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {CostCategoryModel} from '../../../../data/schema/cost-category.model';
import {CostCategoryService} from '../../../../core/services/agency/cost-category.service';

@Component({
    selector: 'app-cost-category',
    templateUrl: './cost-category.component.html'
})
export class CostCategoryComponent implements AfterViewInit {
    public search: BaseSearchModel<CostCategoryModel[]> = new BaseSearchModel<CostCategoryModel[]>();
    private costCategoryId: string;

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private costCategoryService: CostCategoryService
    ) {
    }

    ngAfterViewInit() {
        this.getCostCategorys();
        this.costCategoryId = '';
    }

    public saveCostCategoryCompleteEvent() {
        this.getCostCategorys();
    }

    public dataTableChange(searchChange: BaseSearchModel<CostCategoryModel[]>) {
        this.search = searchChange;
        this.getCostCategorys();
    }

    public confirmDelete(costCategory: CostCategoryModel) {
        this.modal.confirm('Bạn có muốn xóa chi nhánh?').subscribe(res => this.deleteCostCategory(res, costCategory));
    }

    private deleteCostCategory(state: boolean, costCategory: CostCategoryModel) {
        if (state) {
            this.loading.show();
            this.costCategoryId = costCategory.id;
            this.costCategoryService.deleteCostCategory(this.costCategoryId).subscribe(ress => this.deleteCostCategoryCompleted(ress));
        }
    }

    private getCostCategorys() {
        this.loading.show();
        this.costCategoryService.find(this.search).subscribe(res => this.getCostCategorysCompleted(res));
    }

    private getCostCategorysCompleted(res: ResponseModel<BaseSearchModel<CostCategoryModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.search = res.result;
    }

    private deleteCostCategoryCompleted(ress: ResponseModel<CostCategoryModel>) {
        this.loading.hide();
        if (ress.status !== HTTP_CODE_CONSTANT.OK) {
            ress.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa chi nhánh thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getCostCategorys();
    }
}
