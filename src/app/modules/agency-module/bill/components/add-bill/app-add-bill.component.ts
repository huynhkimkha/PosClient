import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { PRODUCT_STATUS_CONSTANT } from 'src/app/core/constant/product-status.constant';
import {ProductFullModel} from '../../../../../data/schema/product-full.model';
import {CategoryModel} from '../../../../../data/schema/category.model';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
import {CategoryService} from '../../../../../core/services/agency/category.service';
import {ProductService} from '../../../../../core/services/agency/product.service';
import {SizeService} from '../../../../../core/services/agency/size.service';
import {ProductCategoryModel} from '../../../../../data/schema/product-category.model';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {SizeModel} from '../../../../../data/schema/size.model';
import {ProductModel} from "../../../../../data/schema/product.model";



@Component({
    selector: 'app-add-bill',
    templateUrl: './app-add-bill.component.html'
})
export class AppAddBillComponent implements AfterViewInit {
    public productList: ProductFullModel[] = [];
    public PRODUCT_STATUS_CONSTANT = PRODUCT_STATUS_CONSTANT;
    public categories: CategoryModel[] = [];
    public categoryList: CategoryModel[] = [];
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private modal: AppModals,
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private categoryService: CategoryService,
        private productService: ProductService,
        private sizeService: SizeService
    ) {

    }

    ngAfterViewInit() {
        this.loadProducts();
        this.loadCategory();
        this.loadSizes();
    }

    public show() {
        this.categories = [];
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    private loadProducts() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.productService.findAllFull().subscribe(res => this.loadProductsCompleted(res));
    }

    private loadProductsCompleted(res: ResponseModel<ProductFullModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.productList = res.result;
    }

    private loadCategory() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.categoryService.findAll().subscribe(res => this.loadCategoryCompleted(res));
    }

    private loadCategoryCompleted(res: ResponseModel<CategoryModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.categoryList = res.result;
    }

    private loadSizes() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.sizeService.findAll().subscribe(res => this.loadSizesCompleted(res));
    }

    private loadSizesCompleted(res: ResponseModel<SizeModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        // this.sizeList = res.result;
    }

}
