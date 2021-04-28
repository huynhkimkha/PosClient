import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
import {CostModel} from '../../../../data/schema/cost.model';
import {AppModalWrapperComponent} from '../../modal-wrapper/app-modal-wrapper.component';
import {AppAlert, AppLoading} from '../../../utils';
import {CostService} from '../../../../core/services/agency/cost.service';

@Component({
    selector: 'app-cost-statistic-general',
    templateUrl: './app-cost-statistic-general.component.html'
})
export class AppCostStatisticGeneralComponent implements AfterViewInit {
    public costList: CostModel[] = [];
    public costTotal: number;

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private costService: CostService
    ) {
    }

    ngAfterViewInit() {
    }

    public show(costList: CostModel[]) {
        this.costList = costList;
        this.costTotal = 0;
        for (const item of this.costList){
            this.costTotal += item.amount;
        }
        this.appModalWrapper.show();
    }
}