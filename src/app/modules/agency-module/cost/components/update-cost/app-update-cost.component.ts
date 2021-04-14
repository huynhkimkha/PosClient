import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CostModel} from '../../../../../data/schema/cost.model';
import {CostService} from '../../../../../core/services/agency/cost.service';
import {TYPE_COST_CONSTANT} from '../../../../../core/constant/type-cost.constant';

@Component({
    selector: 'app-update-cost',
    templateUrl: './app-update-cost.component.html'
})
export class AppUpdateCostComponent implements AfterViewInit {
    public cost: CostModel = new CostModel();
    public typeCostEnum = TYPE_COST_CONSTANT;

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private costService: CostService
    ) {
    }

    ngAfterViewInit() {
    }

    public show(cost: CostModel) {
        this.cost = new CostModel(cost);
        this.loadCost();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCost() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costService.update(this.cost).subscribe(res => this.saveCostCompleted(res));
    }

    private saveCostCompleted(res: ResponseModel<CostModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Cập nhật chi nhánh thành công!');
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
}
