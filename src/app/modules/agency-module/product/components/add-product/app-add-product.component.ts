import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading} from '../../../../../shared/utils';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {CategoryService} from '../../../../../core/services/agency/category.service';
import {ProductFullModel} from '../../../../../data/schema/product-full.model';
import { PRODUCT_STATUS_CONSTANT } from 'src/app/core/constant/product-status.constant';
import {ProductService} from '../../../../../core/services/agency/product.service';
import {CategoryModel} from '../../../../../data/schema/category.model';
import {ProductCategoryModel} from '../../../../../data/schema/product-category.model';
import {ImgbbService} from '../../../../../core/services/generic/imgbb.service';


@Component({
    selector: 'app-add-product',
    templateUrl: './app-add-product.component.html'
})
export class AppAddProductComponent implements AfterViewInit {
    public product: ProductFullModel = new ProductFullModel();
    public PRODUCT_STATUS_CONSTANT = PRODUCT_STATUS_CONSTANT;
    public categories: CategoryModel[] = [];
    public categoryList: CategoryModel[] = [];
    public files = new Array<File>();

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private categoryService: CategoryService,
        private productService: ProductService,
        private imgbbService: ImgbbService
    ) {

    }

    ngAfterViewInit() {
        this.loadCategory();
    }

    public show() {
        this.product = new ProductFullModel();
        this.product.status = PRODUCT_STATUS_CONSTANT.ACTIVE;
        this.categories = [];
        this.files = new Array<File>();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveProduct() {
        let productCategory: ProductCategoryModel;
        this.product.productCategoryList = [];
        for (const item of this.categories){
            productCategory = new ProductCategoryModel();
            productCategory.category.id = item.id;
            this.product.productCategoryList.push(productCategory);
        }

        if (this.files.length !== 0){
            this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
            this.upload();
        }else{
            this.productService.save(this.product).subscribe(response => this.saveProductCompleted(response));
        }
    }

    private saveProductCompleted(res: ResponseModel<ProductFullModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm sản phẩm thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
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

    public logFileEvent(event) {
        this.files = event.target.files;
    }

    public upload() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.imgbbService.upload(this.files[0]).subscribe((response) => this.uploadCompleted(response));
    }


    private uploadCompleted(res: any) {
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
            return;
        }
        this.product.image = res.data.thumb.url;
        this.productService.save(this.product).subscribe(response => this.saveProductCompleted(response));
    }
}
