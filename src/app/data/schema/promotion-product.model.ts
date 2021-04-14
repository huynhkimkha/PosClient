import {ProductModel} from './product.model';
import {PromotionModel} from './promotion.model';

export class PromotionProductModel {
    public id: string;
    public promotion: PromotionModel;
    public product: ProductModel;

    public constructor(
        data?: PromotionProductModel
    ){
        const promotionProduct = data == null ? this : data;
        this.id = promotionProduct.id;
        this.promotion = new PromotionModel(promotionProduct.promotion);
        this.product = new ProductModel(promotionProduct.product);
    }
}
