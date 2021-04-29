import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {PromotionFullModel} from '../../../../../data/schema/promotion-full.model';
import {TYPE_PROMOTION_CONSTANT} from '../../../../../core/constant/type-promotion.constant';
import {STATUS_PROMOTION_CONSTANT} from '../../../../../core/constant/status-promotion.constant';
import {ProductModel} from '../../../../../data/schema/product.model';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {ProductService} from '../../../../../core/services/agency/product.service';
import {PromotionProductModel} from '../../../../../data/schema/promotion-product.model';
import {PromotionService} from '../../../../../core/services/agency/promotion.service';
import {PromotionModel} from '../../../../../data/schema/promotion.model';


@Component({
    selector: 'app-update-promotion',
    templateUrl: './app-update-promotion.component.html'
})
export class AppUpdatePromotionComponent implements AfterViewInit {
    public promotion: PromotionFullModel = new PromotionFullModel();
    public TYPE_PROMOTION_CONSTANT = TYPE_PROMOTION_CONSTANT;
    public STATUS_PROMOTION_CONSTANT = STATUS_PROMOTION_CONSTANT;
    public productList: ProductModel[] = [];
    public productListSelected: ProductModel[] = [];
    public promotionSelected: PromotionModel = new PromotionModel();
    public product: ProductModel = new ProductModel();
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private modal: AppModals,
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private productService: ProductService,
        private promotionService: PromotionService
    ) {

    }
    ngAfterViewInit() {
        this.loadProducts();
    }

    public show(promotionModel: PromotionModel) {
        this.promotionSelected = new PromotionModel(promotionModel);
        this.loadPromotion();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public select(type: string){
        this.promotion.typePromotion = type;
    }

    public savePromotion() {
        let promotionProduct: PromotionProductModel;
        this.promotion.promotionProductList = [];
        for (const item of this.productListSelected){
            promotionProduct = new PromotionProductModel();
            promotionProduct.product.id = item.id;
            this.promotion.promotionProductList.push(promotionProduct);
        }
        this.promotionService.update(this.promotion).subscribe(response => this.savePromotionCompleted(response));

    }

    private loadPromotion() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.promotionService.getFullById(this.promotionSelected.id).subscribe(res => this.loadPromotionCompleted(res));
    }

    private loadPromotionCompleted(res: ResponseModel<PromotionFullModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.promotion = new PromotionFullModel(res.result);
        this.loadPromotionProductCompleted();
    }

    private loadPromotionProductCompleted() {
        this.productListSelected = [];
        for (const item of this.promotion.promotionProductList){
            this.product = new ProductModel();
            this.product.id = item.product.id;
            this.productListSelected.push(this.product);
        }
    }

    private savePromotionCompleted(res: ResponseModel<PromotionFullModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm giảm giá thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    private loadProducts() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.productService.findAll().subscribe(res => this.loadProductsCompleted(res));
    }

    private loadProductsCompleted(res: ResponseModel<ProductModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.productList = res.result;
    }
}
