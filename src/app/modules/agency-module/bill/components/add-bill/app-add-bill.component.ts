import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {ProductFullModel} from '../../../../../data/schema/product-full.model';
import {CategoryModel} from '../../../../../data/schema/category.model';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
import {CategoryService} from '../../../../../core/services/agency/category.service';
import {ProductService} from '../../../../../core/services/agency/product.service';
import {SizeService} from '../../../../../core/services/agency/size.service';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {BillFullModel} from '../../../../../data/schema/bill-full.model';
import {BillProductSizeModel} from '../../../../../data/schema/bill-product-size.model';
import {ProductSizeModel} from '../../../../../data/schema/product-size.model';
import {BillService} from '../../../../../core/services/agency/bill.service';
import {Router} from '@angular/router';
import {EmployeeModel} from '../../../../../data/schema/employee.model';
import {EmployeeService} from '../../../../../core/services/agency/employee.service';
import {PromotionModel} from '../../../../../data/schema/promotion.model';
import {PromotionService} from '../../../../../core/services/agency/promotion.service';
import {TYPE_PROMOTION_CONSTANT} from '../../../../../core/constant/type-promotion.constant';
declare var $: any;

@Component({
    selector: 'app-add-bill',
    templateUrl: './app-add-bill.component.html',
    styleUrls: ['./app-add-bill.component.css']
})
export class AppAddBillComponent implements AfterViewInit {
    public billFull: BillFullModel = new BillFullModel();
    public productList: ProductFullModel[] = [];
    public TYPE_PROMOTION_CONSTANT = TYPE_PROMOTION_CONSTANT;
    public categories: CategoryModel[] = [];
    public categoryList: CategoryModel[] = [];
    public currentUser: EmployeeModel = new EmployeeModel();
    public selectedPromotion: PromotionModel = new PromotionModel();
    public moneyGiven: number;
    public excessMoney: number;
    public selectedCate: CategoryModel = new CategoryModel();
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', {static: true}) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private modal: AppModals,
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private categoryService: CategoryService,
        private productService: ProductService,
        private sizeService: SizeService,
        private billService: BillService,
        private router: Router,
        private employeeService: EmployeeService,
    ) {
        $('.adi-print-section').remove();
    }

    ngAfterViewInit() {
        this.loadProducts();
        this.loadCategory();
        $(this.root.nativeElement.querySelector('.adi-print-section')).appendTo('body');
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        this.billFull.createdDate = yyyy + '-' + mm + '-' + dd;
        this.getCurrentUserByEmail();
        this.getNumber();
        this.moneyGiven = 0;
        this.excessMoney = 0;
    }


    public hide() {
        this.appModalWrapper.hide();
    }

    public print() {
        this.loading.show();
        setTimeout(() => {
            this.loading.hide();
            window.print();
        }, 500);

    }

    private getCurrentUserByEmail() {
        const employeeEmail = JSON.parse(localStorage.getItem('USER_DATA')).email;
        this.employeeService.getEmployeeByEmail(employeeEmail).subscribe(res => this.getCurrentUserByEmailCompleted(res));
    }

    private getCurrentUserByEmailCompleted(res: ResponseModel<EmployeeModel>) {
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.currentUser = res.result;
        this.billFull.employee = new EmployeeModel(this.currentUser);
    }

    public loadProducts() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.selectedCate = new CategoryModel();
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

        this.productList = [];
        const productLst = res.result || [];
        for (const item of productLst) {
            this.productList.push(new ProductFullModel(item));
        }
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

    public addProductSize(productSize: ProductSizeModel): void {
        const index = this.billFull.billProductSizeList.findIndex(i => i.productSize.id === productSize.id);
        if (index !== -1) {
            this.billFull.billProductSizeList[index].quantity += 1;
            this.changeQuantity(index);
            return;
        }
        const transaction = new BillProductSizeModel();
        transaction.productSize = new ProductSizeModel(productSize);
        transaction.quantity = 1;
        transaction.price = transaction.productSize.price;
        this.billFull.billProductSizeList.push(new BillProductSizeModel(transaction));
        this.choosePromotion(this.selectedPromotion);
    }

    public deleteDetail(index: number) {
        this.billFull.billProductSizeList.splice(index, 1);
        this.choosePromotion(this.selectedPromotion);
    }

    public changeQuantity(index: number) {
        this.billFull.billProductSizeList[index].price = this.billFull.billProductSizeList[index].quantity *
            this.billFull.billProductSizeList[index].productSize.price;
        this.choosePromotion(this.selectedPromotion);
    }

    public saveBill() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.billFull.code = 'HD';
        this.billFull.employee = new EmployeeModel(this.currentUser);
        this.billService.save(this.billFull).subscribe(res => this.saveBillCompleted(res));
    }

    private saveBillCompleted(res: ResponseModel<BillFullModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Tạo hóa đơn thành công');
        this.saveCompleteEvent.emit();
        this.closeAddBill();
    }

    public closeAddBill() {
        this.router.navigateByUrl('/bill');
    }

    public getNumber() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        setTimeout(() => {
            this.billService.getNumber(this.billFull.createdDate).subscribe(res => this.getNumberCompleted(res));
        }, 250);
    }

    private getNumberCompleted(res: ResponseModel<string>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.billFull.number = res.result;
    }

    public chooseCategory(cate: CategoryModel) {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.selectedCate = new CategoryModel(cate);
        this.productService.findAllFullByCateId(cate.id).subscribe(res => this.loadProductsByCateCompleted(res));
    }

    private loadProductsByCateCompleted(res: ResponseModel<ProductFullModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }

        this.productList = [];
        const productLst = res.result || [];
        for (const item of productLst) {
            this.productList.push(new ProductFullModel(item));
        }
    }

    public choosePromotion(promotion: PromotionModel) {
        this.selectedPromotion = new PromotionModel(promotion);
        this.billFull.amount = this.billFull.getTotal();
        if (this.selectedPromotion.id) {
            if (this.selectedPromotion.typePromotion === TYPE_PROMOTION_CONSTANT.FIXED) {
                this.billFull.amount -= this.selectedPromotion.amount;
            } else {
                this.billFull.amount -= (this.billFull.amount * this.selectedPromotion.amount / 100);
            }
        }
    }

    public excessCash() {
        this.excessMoney = this.moneyGiven - this.billFull.amount;
    }

    public formatDate(inputDate: string) {
        const formattedDate = new Date(inputDate);
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
    }
}
