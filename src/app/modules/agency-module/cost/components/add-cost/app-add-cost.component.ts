import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CostModel} from '../../../../../data/schema/cost.model';
import {CostService} from '../../../../../core/services/agency/cost.service';
import {CostCategoryModel} from '../../../../../data/schema/cost-category.model';
import {CostCategoryService} from '../../../../../core/services/agency/cost-category.service';

@Component({
    selector: 'app-add-cost',
    templateUrl: './app-add-cost.component.html'
})
export class AppAddCostComponent implements AfterViewInit {
    public cost: CostModel = new CostModel();
    public costCategoryList: CostCategoryModel[] = [];

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private costService: CostService,
        private costCategoryService: CostCategoryService
    ) {

    }

    ngAfterViewInit() {
    }

    public show() {
        this.cost = new CostModel();
        this.cost.code = 'PCP';
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        this.cost.createdDate = yyyy + '-' + mm + '-' + dd;
        this.getNumber();
        this.loadCostCategorys();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCost() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costService.save(this.cost).subscribe(res => this.saveCostCompleted(res));
    }

    private loadCostCategorys() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costCategoryService.findAll().subscribe(res => this.loadCostCategorysCompleted(res));
    }

    private loadCostCategorysCompleted(res: ResponseModel<CostCategoryModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.costCategoryList = res.result;
        this.cost.costCategory = this.costCategoryList[0];
    }

    private saveCostCompleted(res: ResponseModel<CostModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm chi phí thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    public getNumber() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costService.getNumber(this.cost.createdDate).subscribe(res => this.getNumberCompleted(res));

    }

    private getNumberCompleted(res: ResponseModel<string>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.cost.number = res.result;
    }
}
