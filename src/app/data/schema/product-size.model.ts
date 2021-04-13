import {ProductModel} from './product.model';
import {SizeModel} from './size.model';

export class ProductSizeModel {
    public id: string;
    public product: ProductModel;
    public size: SizeModel;
    public price: number;

    public constructor(
        data?: ProductSizeModel
    ){
        const productSize = data == null ? this : data;
        this.id = productSize.id;
        this.product = new ProductModel(productSize.product);
        this.size = new SizeModel(productSize.size);
        this.price = productSize.price;
    }
}
