import {PRODUCT_STATUS_CONSTANT} from '../../core/constant/product-status.constant';
import {ProductCategoryModel} from './product-category.model';

export class ProductFullModel {
    public id: string;
    public name: string;
    public nameSlug: string;
    public price: number;
    public image: string;
    public status: string;
    public content: string;
    public createdDate: string;
    public updatedDate: string;

    public productCategoryList: ProductCategoryModel[];

    public constructor(
        data?: ProductFullModel
    ){
        const product = data == null ? this : data;
        this.id = product.id;
        this.name = product.name;
        this.status = product.status;
        this.nameSlug = product.nameSlug;
        this.price = product.price;
        this.image = product.image;
        this.content = product.content;
        this.createdDate = product.createdDate;
        this.updatedDate = product.updatedDate;
        this.productCategoryList = [];
        for (const detail of product.productCategoryList) {
            this.productCategoryList.push(new ProductCategoryModel(detail));
        }
    }

    public getProductStatus(): string {
        switch (this.status) {
            case PRODUCT_STATUS_CONSTANT.ACTIVE:
                return 'Hoạt động';
            case PRODUCT_STATUS_CONSTANT.INACTIVE:
                return 'Ngừng kinh doanh';
            default:
                return '';
        }
    }
}
