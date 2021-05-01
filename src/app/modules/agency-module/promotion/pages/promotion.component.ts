import {AfterViewInit, Component} from '@angular/core';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {PromotionModel} from '../../../../data/schema/promotion.model';
import {PromotionService} from '../../../../core/services/agency/promotion.service';
import {STATUS_PROMOTION_CONSTANT} from '../../../../core/constant/status-promotion.constant';
import {TYPE_PROMOTION_CONSTANT} from '../../../../core/constant/type-promotion.constant';

@Component({
    selector: 'app-promotion',
    templateUrl: './promotion.component.html'
})
export class PromotionComponent implements AfterViewInit {
    public search: BaseSearchModel<PromotionModel[]> = new BaseSearchModel<PromotionModel[]>();
    public STATUS_PROMOTION_CONSTANT = STATUS_PROMOTION_CONSTANT;
    public TYPE_PROMOTION_CONSTANT = TYPE_PROMOTION_CONSTANT;

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private promotionService: PromotionService
    ) {
    }

    ngAfterViewInit() {
        this.getPromotions();
    }

    public dataTableChange(searchChange: BaseSearchModel<PromotionModel[]>) {
        this.search = searchChange;
        this.getPromotions();
    }

    public savePromotionCompleteEvent() {
        this.getPromotions();
    }

    public confirmDelete(promotion: PromotionModel) {
        this.modal.confirm('Bạn có muốn xóa sản phẩm?').subscribe(res => this.deletePromotion(res, promotion));
    }

    private deletePromotion(state: boolean, promotion: PromotionModel) {
        if (state) {
            this.loading.show();
            this.promotionService.deletePromotion(promotion.id)
                .subscribe(res => this.deletePromotionCompleted(res));
        }
    }

    private deletePromotionCompleted(res: ResponseModel<boolean>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa giảm giá thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getPromotions();
    }

    private getPromotions() {
        this.loading.show();
        this.promotionService.find(this.search).subscribe(res => this.getPromotionsCompleted(res));
    }

    private getPromotionsCompleted(res: ResponseModel<BaseSearchModel<PromotionModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        const promotionList = res.result.result || [];
        this.search = res.result;
        this.search.result = [];
        for (const item of promotionList) {
            this.search.result.push(new PromotionModel(item));
        }
    }
}
