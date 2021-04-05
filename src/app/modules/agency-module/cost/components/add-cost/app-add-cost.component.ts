import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CostModel} from '../../../../../data/schema/cost.model';
import {CostService} from '../../../../../core/services/agency/cost.service';
import {TYPE_COST_CONSTANT} from '../../../../../core/constant/cost.constant';

@Component({
    selector: 'app-add-cost',
    templateUrl: './app-add-cost.component.html'
})
export class AppAddCostComponent implements AfterViewInit {
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

    public show() {
        this.cost = new CostModel();
        this.cost.typeCost = this.typeCostEnum.ELSE;
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveCost() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.costService.save(this.cost).subscribe(res => this.saveCostCompleted(res));
    }

    private saveCostCompleted(res: ResponseModel<CostModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm chi nhánh thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }
}
