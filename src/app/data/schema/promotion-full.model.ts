import {STATUS_PROMOTION_CONSTANT} from '../../core/constant/status-promotion.constant';
import {TYPE_PROMOTION_CONSTANT} from '../../core/constant/type-promotion.constant';
import {PromotionProductModel} from './promotion-product.model';

export class PromotionFullModel {
    public id: string;
    public name: string;
    public description: string;
    public amount: number;
    public typePromotion: string;
    public status: string;
    public expiredDate: Date;
    public promotionProductList: PromotionProductModel[];


    public constructor(
        data?: PromotionFullModel
    ){
        const promotion = data == null ? this : data;
        this.id = promotion.id;
        this.name = promotion.name;
        this.description = promotion.status;
        this.amount = promotion.amount;
        this.typePromotion = promotion.typePromotion;
        this.status = promotion.status;
        this.expiredDate = promotion.expiredDate;
        this.promotionProductList = [];
        for (const detail of promotion.promotionProductList) {
            this.promotionProductList.push(new PromotionProductModel(detail));
        }
    }

    public getStatusPromotion(): string {
        switch (this.status) {
            case STATUS_PROMOTION_CONSTANT.ACTIVE:
                return 'Hoạt động';
            case STATUS_PROMOTION_CONSTANT.INACTIVE:
                return 'Ngừng kinh doanh';
            default:
                return '';
        }
    }

    public getTypePromotion(): string {
        switch (this.typePromotion) {
            case TYPE_PROMOTION_CONSTANT.FIXED:
                return 'ĐỒNG';
            case TYPE_PROMOTION_CONSTANT.PERCENT:
                return '%';
            default:
                return '';
        }
    }
}
