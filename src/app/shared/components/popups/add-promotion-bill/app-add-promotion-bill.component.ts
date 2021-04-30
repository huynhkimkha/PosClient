import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {PromotionModel} from '../../../../data/schema/promotion.model';
import {AppModalWrapperComponent} from '../../modal-wrapper/app-modal-wrapper.component';
import {AppAlert, AppLoading} from '../../../utils';
import {PromotionService} from '../../../../core/services/agency/promotion.service';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';

@Component({
    selector: 'app-add-promotion-bill',
    templateUrl: './app-add-promotion-bill.component.html'
})
export class AppAddPromotionBillComponent implements AfterViewInit {
    public promotionList: PromotionModel[] = [];
    public selectedPromotion: PromotionModel = new PromotionModel();
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private promotionService: PromotionService
    ) {

    }

    ngAfterViewInit() {}

    public show() {
        this.selectedPromotion = new PromotionModel();
        this.loadPromotions();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    private loadPromotions() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.promotionService.findAll().subscribe(res => this.loadPromotionsCompleted(res));
    }

    private loadPromotionsCompleted(res: ResponseModel<PromotionModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.promotionList = [];
        this.promotionList = res.result;
    }

    public selectPromotion(i: PromotionModel){
        this.selectedPromotion = new PromotionModel(i);
    }

    public choosePromotion(){
       this.saveCompleteEvent.emit(this.selectedPromotion);
       this.hide();
    }
}
