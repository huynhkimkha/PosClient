import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { PRODUCT_STATUS_CONSTANT } from 'src/app/core/constant/product-status.constant';
import {ProductFullModel} from '../../../../../data/schema/product-full.model';
import {CategoryModel} from '../../../../../data/schema/category.model';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
import {CategoryService} from '../../../../../core/services/agency/category.service';
import {ProductService} from '../../../../../core/services/agency/product.service';
import {SizeService} from '../../../../../core/services/agency/size.service';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {SizeModel} from '../../../../../data/schema/size.model';
import {BillFullModel} from '../../../../../data/schema/bill-full.model';
import {BillProductSizeModel} from '../../../../../data/schema/bill-product-size.model';
import {ProductSizeModel} from '../../../../../data/schema/product-size.model';
import {BillService} from '../../../../../core/services/agency/bill.service';
import {Router} from '@angular/router';
import {EmployeeModel} from "../../../../../data/schema/employee.model";
import {EmployeeService} from "../../../../../core/services/agency/employee.service";

@Component({
    selector: 'app-add-bill',
    templateUrl: './app-add-bill.component.html',
    styleUrls: ['./app-add-bill.component.css']
})
export class AppAddBillComponent implements AfterViewInit {
    public billFull: BillFullModel = new BillFullModel();
    public productList: ProductFullModel[] = [];
    public PRODUCT_STATUS_CONSTANT = PRODUCT_STATUS_CONSTANT;
    public categories: CategoryModel[] = [];
    public categoryList: CategoryModel[] = [];
    public currentUser: EmployeeModel = new EmployeeModel();
    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

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
        private employeeService: EmployeeService
    ) {

    }

    ngAfterViewInit() {
        this.loadProducts();
        this.loadCategory();
        this.loadSizes();
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        this.billFull.createdDate = yyyy + '-' + mm + '-' + dd;
        this.getCurrentUserByEmail();
        this.getNumber();
    }



    public hide() {
        this.appModalWrapper.hide();
    }

    private getCurrentUserByEmail(){
        const employeeEmail = JSON.parse(localStorage.getItem('USER_DATA')).email;
        this.employeeService.getEmployeeByEmail(employeeEmail).subscribe(res => this.getCurrentUserByEmailCompleted(res));
    }

    private getCurrentUserByEmailCompleted(res: ResponseModel<EmployeeModel>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.currentUser = res.result;
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

    public addProduct(product: ProductFullModel): void{
        const transaction = new BillProductSizeModel();
        transaction.productSize = new ProductSizeModel(product.productSizeList[0]);
        transaction.quantity = 1;
        transaction.price = transaction.productSize.price;
        this.billFull.billProductSizeList.push( new BillProductSizeModel(transaction));
    }


    public confirmDeleteDetail(index: number){
        this.modal.confirm('Bạn có muốn xóa hàng này?').subscribe(res => this.deleteDetail(res, index));
    }

    private deleteDetail(state: boolean, index: number) {
        if (state) {
            this.billFull.billProductSizeList.splice(index, 1);
        }
    }

    public changeQuantity(index: number) {
        this.billFull.billProductSizeList[index].price =  this.billFull.billProductSizeList[index].quantity * this.billFull.billProductSizeList[index].productSize.price;
    }

    public saveBill()  {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.billFull.amount = this.billFull.getTotal();
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

    public closeAddBill(){
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
}
