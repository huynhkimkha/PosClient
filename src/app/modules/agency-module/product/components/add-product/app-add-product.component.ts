import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
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
import {SizeModel} from '../../../../../data/schema/size.model';
import {SizeService} from '../../../../../core/services/agency/size.service';
import {ProductSizeModel} from '../../../../../data/schema/product-size.model';


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
    public sizeList: SizeModel[] = [];
    public productSize: ProductSizeModel = new ProductSizeModel();
    public updateMode: boolean;
    private curIndex: number;
    public sizeIndex: number;
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private modal: AppModals,
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private categoryService: CategoryService,
        private productService: ProductService,
        private imgbbService: ImgbbService,
        private sizeService: SizeService
    ) {

    }

    ngAfterViewInit() {
        this.loadCategory();
        this.loadSizes();
    }

    public show() {
        this.product = new ProductFullModel();
        this.product.status = PRODUCT_STATUS_CONSTANT.ACTIVE;
        this.categories = [];
        this.files = new Array<File>();
        this.updateMode = false;
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
        this.sizeList = res.result;
    }

    public saveProductSize() {
        this.collectData();
        if (!this.updateMode) {
            this.product.productSizeList.push(new ProductSizeModel(this.productSize));
        }
        else {
            this.updateProductSize();
        }
        this.resetProductSize();
    }

    public confirmDeleteProductSize(index: number) {
        this.modal.confirm('Bạn có muốn xóa kích cỡ theo giá này?').subscribe(res => this.deleteProductSize(res, index));
    }

    private deleteProductSize(state: boolean, index: number) {
        if (state) {
            this.product.productSizeList.splice(index, 1);
            this.resetProductSize();
        }
    }

    private collectData() {
        this.productSize.size = new SizeModel(this.sizeList[this.sizeIndex]) || new SizeModel();
        this.productSize.price = this.productSize.price || 0;
    }

    public selectProductSize(index: number) {
        this.updateMode = true;
        this.productSize = new ProductSizeModel(this.product.productSizeList[index]);
        this.curIndex = index;
        this.sizeIndex = index;
    }

    public resetProductSize() {
        this.updateMode = false;
        this.productSize.size = new SizeModel();
        this.productSize.price = 0;
    }

    private updateProductSize() {
        this.product.productSizeList[this.curIndex] = new ProductSizeModel(this.productSize);
    }
}
