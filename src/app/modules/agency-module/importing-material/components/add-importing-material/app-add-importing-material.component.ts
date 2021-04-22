import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {ResponseModel} from '../../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../../core/constant/http-code.constant';
import {ImportingTransactionModel} from '../../../../../data/schema/importing-transaction.model';
import {ImportingMaterialFullModel} from '../../../../../data/schema/importing-material-full.model';
import {ImportingMaterialService} from '../../../../../core/services/agency/importing-material.service';
import {MaterialService} from '../../../../../core/services/agency/material.service';
import {CustomerModel} from '../../../../../data/schema/customer.model';
import {CustomerService} from '../../../../../core/services/agency/customer.service';
import {MaterialModel} from '../../../../../data/schema/material.model';


@Component({
    selector: 'app-add-importing-material',
    templateUrl: './app-add-importing-material.component.html'
})
export class AppAddImportingMaterialComponent implements AfterViewInit {
    public importingMaterial: ImportingMaterialFullModel = new ImportingMaterialFullModel();
    public importingTransactionSelected: ImportingTransactionModel = new ImportingTransactionModel();
    public material: MaterialModel = new MaterialModel();
    public materialList: MaterialModel[] = [];
    public customerList: CustomerModel[] = [];
    public customerSelected: CustomerModel = new CustomerModel();
    public updateMode: boolean;
    private curIndex: number;

    @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('appModalWrapper', { static: true }) appModalWrapper: AppModalWrapperComponent;

    constructor(
        private modal: AppModals,
        private root: ElementRef,
        private alert: AppAlert,
        private loading: AppLoading,
        private materialService: MaterialService,
        private importingMaterialService: ImportingMaterialService,
        private customerService: CustomerService
    ) {

    }
    ngAfterViewInit() {
    }

    public show() {
        this.importingMaterial = new ImportingMaterialFullModel();
        this.appModalWrapper.show();
    }

    public hide() {
        this.appModalWrapper.hide();
    }

    public saveImportingMaterial() {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.importingMaterial.amount = this.importingMaterial.getTotal();
        this.importingMaterialService.save(this.importingMaterial).subscribe(response => this.saveImportingMaterialCompleted(response));
    }

    public selectCustomer() {
        this.customerSelected = new CustomerModel(this.customerSelected);
        this.importingMaterial.customer = this.customerSelected;
    }

    private saveImportingMaterialCompleted(res: ResponseModel<ImportingMaterialFullModel>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.alert.success('Thêm phiếu nhập thành công!');
        this.hide();
        this.saveCompleteEvent.emit(res.result);
    }

    public searchCustomer(event, isSearchTransactionCustomer) {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.customerService.getLikeName(event.query).subscribe(res => this.searchCustomerComplete(res));
    }

    private searchCustomerComplete(res: ResponseModel<CustomerModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.customerList = res.result || [];
    }

    public searchMaterial(event, isSearchTransactionCustomer) {
        this.loading.show(this.root.nativeElement.querySelector('.modal-content'));
        this.materialService.getLikeName(event.query).subscribe(res => this.searchMaterialComplete(res));
    }

    private searchMaterialComplete(res: ResponseModel<MaterialModel[]>) {
        this.loading.hide(this.root.nativeElement.querySelector('.modal-content'));
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.materialList = res.result || [];
    }

    public selectMaterial() {
        this.material = new MaterialModel(this.material);
        this.importingTransactionSelected.material = this.material;
        this.importingTransactionSelected.price = this.material.price || 0;
    }

    public cancelTransaction() {
        this.resetTransaction();
    }

    public saveTransaction() {
        this.collectTransaction();
        if (!this.updateMode) {
            this.importingMaterial.importingTransactionList.push(new ImportingTransactionModel(this.importingTransactionSelected));
        }
        else {
            this.updateTransactions();
        }
        this.resetTransaction();
    }

    public selectTransaction(index: number) {
        this.updateMode = true;
        this.curIndex = index;
        this.importingTransactionSelected = new ImportingTransactionModel(this.importingMaterial.importingTransactionList[index]);
        this.material = new MaterialModel(this.importingTransactionSelected.material);
    }

    public changeQuantity() {
        if (this.importingTransactionSelected.price) {
            this.changePrice();
        }
    }

    public changePrice() {
        const price = this.importingTransactionSelected.price || 0;
        if (price > 0) {
            this.importingTransactionSelected.amount = this.importingTransactionSelected.quantity * this.importingTransactionSelected.price;
        }
    }

    public confirmDeleteTransaction(index: number) {
        this.modal.confirm('Bạn có muốn xóa nguyên liệu?').subscribe(res => this.deleteTransaction(res, index));
    }

    private deleteTransaction(state: boolean, index: number) {
        if (state) {
            this.importingMaterial.importingTransactionList.splice(index, 1);
            this.resetTransaction();
        }
    }

    private collectTransaction() {
        this.importingTransactionSelected.quantity = this.importingTransactionSelected.quantity || 0;
        this.importingTransactionSelected.price = this.importingTransactionSelected.price || 0;
    }

    private updateTransactions() {
        this.importingMaterial.importingTransactionList[this.curIndex] = new ImportingTransactionModel(this.importingTransactionSelected);
    }

    private resetTransaction() {
        this.updateMode = false;
        this.curIndex = null;
        this.importingTransactionSelected = new ImportingTransactionModel();
        this.importingTransactionSelected.quantity = 0;
        this.importingTransactionSelected.price = 0;
        this.material = new MaterialModel();
    }
}
