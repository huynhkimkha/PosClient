import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CostCategoryModel} from '../../../../../data/schema/cost-category.model';
import {CostCategoryService} from '../../../../../core/services/agency/cost-category.service';

@Component({
    selector: 'app-add-cost-category',
    templateUrl: './app-add-cost-category.component.html'
})
export class AppAddCostCategoryComponent implements AfterViewInit {
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

    public show() {
        this.costCategory = new CostCategoryModel();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCostCategory() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costCategoryService.save(this.costCategory).subscribe(res => this.saveCostCategoryCompleted(res));
    }

    private saveCostCategoryCompleted(res: ResponseModel<CostCategoryModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm danh mục chi phí thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }
}
