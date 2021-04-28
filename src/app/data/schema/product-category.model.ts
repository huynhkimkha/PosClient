import {CategoryModel} from './category.model';
import {ProductFullModel} from './product-full.model';
import {ProductModel} from "./product.model";

export class ProductCategoryModel {
    public id: string;
    public product: ProductModel;
    public category: CategoryModel;

    public constructor(
        data?: ProductCategoryModel
    ){
        const productCategory = data == null ? this : data;
        this.id = productCategory.id;
        this.product = new ProductModel(productCategory.product);
        this.category = new CategoryModel(productCategory.category);
    }
}
