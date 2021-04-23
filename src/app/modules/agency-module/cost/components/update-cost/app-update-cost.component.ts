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
    selector: 'app-update-cost',
    templateUrl: './app-update-cost.component.html'
})
export class AppUpdateCostComponent implements AfterViewInit {
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

    public show(cost: CostModel) {
        this.cost = new CostModel(cost);
        this.loadCost();
        this.loadCostCategorys();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCost() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costService.update(this.cost).subscribe(res => this.saveCostCompleted(res));
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
    }

    private saveCostCompleted(res: ResponseModel<CostModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật chi phí thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    private loadCost() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costService.findOne(this.cost.id).subscribe(res => this.loadCostCompleted(res));
    }

    private loadCostCompleted(res: ResponseModel<CostModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.cost = new CostModel(res.result);
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
