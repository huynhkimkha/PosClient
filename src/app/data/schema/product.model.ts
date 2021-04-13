import {PRODUCT_STATUS_CONSTANT} from '../../core/constant/product-status.constant';

export class ProductModel {
    public id: string;
    public name: string;
    public nameSlug: string;
    public image: string;
    public status: string;
    public content: string;
    public createdDate: string;
    public updatedDate: string;

    public constructor(
        data?: ProductModel
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
