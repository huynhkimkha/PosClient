import {AfterViewInit, Component} from '@angular/core';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {CategoryModel} from '../../../../data/schema/category.model';
import {CategoryService} from '../../../../core/services/agency/category.service';
import { CATEGORY_STATUS_CONSTANT } from 'src/app/core/constant/category-status.constant';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html'
})
export class CategoryComponent implements AfterViewInit {
    public search: BaseSearchModel<CategoryModel[]> = new BaseSearchModel<CategoryModel[]>();
    public CATEGORY_STATUS_CONSTANT = CATEGORY_STATUS_CONSTANT;
    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private categoryService: CategoryService
    ) {
    }

    ngAfterViewInit() {
        this.getCategories();
    }

    public dataTableChange(searchChange: BaseSearchModel<CategoryModel[]>) {
        this.search = searchChange;
        this.getCategories();
    }

    public saveCompleteEvent() {
        this.getCategories();
    }

    public confirmDelete(category: CategoryModel) {
        this.modal.confirm('Bạn có muốn xóa danh mục?').subscribe(res => this.deleteCategory(res, category));
    }

    private deleteCategory(state: boolean, category: CategoryModel) {
        if (state) {
            this.loading.show();
            this.categoryService.deleteCategory(category.id)
                .subscribe(res => this.deleteCategoryCompleted(res));
        }
    }

    private deleteCategoryCompleted(res: ResponseModel<boolean>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa danh mục thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getCategories();
    }

    private getCategories() {
        this.loading.show();
        this.categoryService.find(this.search).subscribe(res => this.getCategoriesCompleted(res));
    }

    private getCategoriesCompleted(res: ResponseModel<BaseSearchModel<CategoryModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        const categoryList = res.result.result || [];
        this.search = res.result;
        this.search.result = [];
        for (const item of categoryList) {
            this.search.result.push(new CategoryModel(item));
        }
    }
}
