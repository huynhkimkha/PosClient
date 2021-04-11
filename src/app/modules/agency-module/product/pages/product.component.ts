import {AfterViewInit, Component} from '@angular/core';
import {BaseSearchModel} from '../../../../data/schema/search/base-search.model';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ProductModel} from '../../../../data/schema/product.model';
import { PRODUCT_STATUS_CONSTANT } from 'src/app/core/constant/product-status.constant';
import {ProductService} from '../../../../core/services/agency/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements AfterViewInit {
    public search: BaseSearchModel<ProductModel[]> = new BaseSearchModel<ProductModel[]>();
    public PRODUCT_STATUS_CONSTANT = PRODUCT_STATUS_CONSTANT;
    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private productService: ProductService
    ) {
    }

    ngAfterViewInit() {
        this.getProducts();
    }

    public dataTableChange(searchChange: BaseSearchModel<ProductModel[]>) {
        this.search = searchChange;
        this.getProducts();
    }

    public saveProductCompleteEvent() {
        this.getProducts();
    }

    public confirmDelete(product: ProductModel) {
        this.modal.confirm('Bạn có muốn xóa sản phẩm?').subscribe(res => this.deleteProduct(res, product));
    }

    private deleteProduct(state: boolean, product: ProductModel) {
        if (state) {
            this.loading.show();
            this.productService.deleteProduct(product.id)
                .subscribe(res => this.deleteProductCompleted(res));
        }
    }

    private deleteProductCompleted(res: ResponseModel<boolean>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Xóa sản phẩm thành công!');
        if (this.search.result.length === 1) {
            this.search.currentPage = this.search.currentPage - 1;
        }
        this.getProducts();
    }

    private getProducts() {
        this.loading.show();
        this.productService.find(this.search).subscribe(res => this.getProductsCompleted(res));
    }

    private getProductsCompleted(res: ResponseModel<BaseSearchModel<ProductModel[]>>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        const productList = res.result.result || [];
        this.search = res.result;
        this.search.result = [];
        for (const item of productList) {
            this.search.result.push(new ProductModel(item));
        }
    }
}
