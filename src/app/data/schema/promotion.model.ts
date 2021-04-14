import {STATUS_PROMOTION_CONSTANT} from '../../core/constant/status-promotion.constant';
import {TYPE_PROMOTION_CONSTANT} from '../../core/constant/type-promotion.constant';

export class PromotionModel {
    public id: string;
    public name: string;
    public description: string;
    public amount: number;
    public typePromotion: string;
    public status: string;
    public expiredDate: Date;


    public constructor(
        data?: PromotionModel
    ){
        const promotion = data == null ? this : data;
        this.id = promotion.id;
        this.name = promotion.name;
        this.description = promotion.description;
        this.amount = promotion.amount;
        this.typePromotion = promotion.typePromotion;
        this.status = promotion.status;
        this.expiredDate = promotion.expiredDate;
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
                return 'VNĐ';
            case TYPE_PROMOTION_CONSTANT.PERCENT:
                return '%';
            default:
                return '';
        }
    }
}
