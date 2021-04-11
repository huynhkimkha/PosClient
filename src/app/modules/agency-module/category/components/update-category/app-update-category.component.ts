import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CategoryModel} from '../../../../../data/schema/category.model';
import {CategoryService} from '../../../../../core/services/agency/category.service';
import { CATEGORY_STATUS_CONSTANT } from 'src/app/core/constant/category-status.constant';

@Component({
    selector: 'app-update-category',
    templateUrl: './app-update-category.component.html'
})
export class AppUpdateCategoryComponent {
    public category: CategoryModel = new CategoryModel();
    public CATEGORY_STATUS_CONSTANT = CATEGORY_STATUS_CONSTANT;

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private categoryService: CategoryService
    ) {
    }

    public show(categoryModel: CategoryModel) {
        this.category = new CategoryModel(categoryModel);
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCategory() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.categoryService.update(this.category).subscribe(res => this.saveCategoryCompleted(res));
    }

    private saveCategoryCompleted(res: ResponseModel<CategoryModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật danh mục thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }
}
