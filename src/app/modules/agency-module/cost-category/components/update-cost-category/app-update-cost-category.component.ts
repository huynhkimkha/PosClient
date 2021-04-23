import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CostCategoryModel} from '../../../../../data/schema/cost-category.model';
import {CostCategoryService} from '../../../../../core/services/agency/cost-category.service';

@Component({
    selector: 'app-update-cost-category',
    templateUrl: './app-update-cost-category.component.html'
})
export class AppUpdateCostCategoryComponent implements AfterViewInit {
    public costCategory: CostCategoryModel = new CostCategoryModel();

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private costCategoryService: CostCategoryService
    ) {
    }

    ngAfterViewInit() {
    }

    public show(costCategory: CostCategoryModel) {
        this.costCategory = new CostCategoryModel(costCategory);
        this.loadCostCategory();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCostCategory() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costCategoryService.update(this.costCategory).subscribe(res => this.saveCostCategoryCompleted(res));
    }

    private saveCostCategoryCompleted(res: ResponseModel<CostCategoryModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật danh mục chi phí thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    private loadCostCategory() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costCategoryService.findOne(this.costCategory.id).subscribe(res => this.loadCostCategoryCompleted(res));
    }

    private loadCostCategoryCompleted(res: ResponseModel<CostCategoryModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.costCategory = new CostCategoryModel(res.result);
    }
}
