import {PRODUCT_STATUS_CONSTANT} from '../../core/constant/product-status.constant';
import {ProductCategoryModel} from './product-category.model';
import {ProductSizeModel} from './product-size.model';
import {ProductModel} from './product.model';

export class ProductFullModel {
    public id: string;
    public name: string;
    public nameSlug: string;
    public image: string;
    public status: string;
    public content: string;
    public createdDate: string;
    public updatedDate: string;

    public productCategoryList: ProductCategoryModel[];
    public productSizeList: ProductSizeModel[];

    public constructor(
        data?: ProductFullModel
    ){
        const product = data == null ? this : data;
        this.id = product.id;
        this.name = product.name;
        this.status = product.status;
        this.nameSlug = product.nameSlug;
        this.image = product.image;
        this.content = product.content;
        this.createdDate = product.createdDate;
        this.updatedDate = product.updatedDate;
        this.productCategoryList = [];
        for (const detail of product.productCategoryList) {
            this.productCategoryList.push(new ProductCategoryModel(detail));
        }
        this.productSizeList = [];
        for (const detail2 of product.productSizeList) {
            this.productSizeList.push(new ProductSizeModel(detail2));
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

    public toProductModel(): ProductModel{
        const product = new ProductModel();
        product.id = this.id;
        product.name = this.name;
        product.status = this.status;
        product.nameSlug = this.nameSlug;
        product.image = this.image;
        product.content = this.content;
        product.createdDate = this.createdDate;
        product.updatedDate = this.updatedDate;
        return  product;
    }
}
