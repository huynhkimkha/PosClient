import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {MonthCostModel} from '../../../../data/schema/month-cost.model';
import {ResponseModel} from '../../../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {CurrentUserService} from '../../../../core/services/agency/current-user.service';
import {USER_PERMISSION_CODE} from '../../../../core/constant/user-permission.constant';
import {DateCostModel} from '../../../../data/schema/date-cost.model';
import {YearCostModel} from '../../../../data/schema/year-cost.model';
import {CostService} from '../../../../core/services/agency/cost.service';
import {EmployeeService} from '../../../../core/services/agency/employee.service';
import {EmployeeModel} from '../../../../data/schema/employee.model';
import {BillService} from '../../../../core/services/agency/bill.service';
import {MonthBillModel} from '../../../../data/schema/month-bill.model';
import {DateBillModel} from '../../../../data/schema/date-bill.model';
import {YearBillModel} from '../../../../data/schema/year-bill.model';
import {CustomerService} from '../../../../core/services/agency/customer.service';
import {CustomerModel} from '../../../../data/schema/customer.model';
import {AgencyModel} from '../../../../data/schema/agency.model';
import {AgencyService} from '../../../../core/services/agency/agency.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {
    private today: Date = new Date();
    public agencyList: AgencyModel[] = [];
    public agencyId: string;
    public costType = '2';
    public costStartDate = new Date(this.today.getFullYear(), 0, 1);
    public costEndDate = new Date(this.today.getFullYear(), 12, 0);
    public costOption = {
        tooltips: {
            callbacks: {
                label(tooltipItem, data) {
                    tooltipItem.yLabel = tooltipItem.yLabel.toString();
                    tooltipItem.yLabel = tooltipItem.yLabel.split('.');

                    tooltipItem.yLabel[0] = tooltipItem.yLabel[0].split(/(?=(?:...)*$)/);
                    if (tooltipItem.yLabel[1]){
                        tooltipItem.yLabel[1] = tooltipItem.yLabel[1].split(/(?=(?:...)*$)/);
                        return tooltipItem.yLabel.join('.') + ' VNĐ';
                    }
                    return tooltipItem.yLabel[0] + ' VNĐ';
                },
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback(value, index, values) {

                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        switch (value.length) {
                            case 4:
                                value = parseFloat(`${value[0]}.${value[1]}`) + ' tỷ';
                                break;
                            case 3:
                                value = parseFloat(`${value[0]}.${value[1]}`) + ' triệu';
                                break;
                            case 2:
                                value = parseFloat(`${value[0]}.${value[1]}`) + ' ngàn';
                                break;
                            default:
                                value = value.join('.');
                                break;
                        }

                        return value;
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'VNĐ'
                }
            }],
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    fontSize: 11
                }
            }]
        }
    };

    public revenueType = '2';
    public revenueStartDate = new Date(this.today.getFullYear(), 0, 1);
    public revenueEndDate = new Date(this.today.getFullYear(), 12, 0);
    public revenueOption = {
        tooltips: {
            callbacks: {
                label(tooltipItem, data) {
                    tooltipItem.yLabel = tooltipItem.yLabel.toString();
                    tooltipItem.yLabel = tooltipItem.yLabel.split('.');

                    tooltipItem.yLabel[0] = tooltipItem.yLabel[0].split(/(?=(?:...)*$)/);
                    if (tooltipItem.yLabel[1]){
                        tooltipItem.yLabel[1] = tooltipItem.yLabel[1].split(/(?=(?:...)*$)/);
                        return tooltipItem.yLabel.join('.') + ' VNĐ';
                    }
                    return tooltipItem.yLabel[0] + ' VNĐ';
                },
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback(value, index, values) {

                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        switch (value.length) {
                            case 4:
                                value = parseFloat(`${value[0]}.${value[1]}`) + ' tỷ';
                                break;
                            case 3:
                                value = parseFloat(`${value[0]}.${value[1]}`) + ' triệu';
                                break;
                            case 2:
                                value = parseFloat(`${value[0]}.${value[1]}`) + ' ngàn';
                                break;
                            default:
                                value = value.join('.');
                                break;
                        }

                        return value;
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'VNĐ'
                }
            }],
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    fontSize: 11
                }
            }]
        }
    };
    public employeeAmount: number;
    public customerAmount: number;
    public USER_PERMISSION_CODE = USER_PERMISSION_CODE;
    private userData: string;
    private countRequest: number;
    private costData: any;
    public costStatisticData: any;
    private revenueData: any;
    public revenueStatisticData: any;
    public currentUser: EmployeeModel = new EmployeeModel();
    public revenueTotal: number;
    public costTotal: number;
    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private cdr: ChangeDetectorRef,
        private costService: CostService,
        public currentUserService: CurrentUserService,
        private employeeService: EmployeeService,
        private billService: BillService,
        private customerService: CustomerService,
        private agencyService: AgencyService
    ) {
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
        this.getCost();
        this.getRevenue();
        this.getCurrentUserByEmail();
        this.findAllEmployee();
        this.findAllCustomer();
        this.findAllAgency();
    }

    private findAllAgency(){
        this.agencyService.findAll().subscribe(res => this.findAllAgencyCompleted(res));
    }

    private findAllAgencyCompleted(res: ResponseModel<AgencyModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.agencyId = JSON.parse(localStorage.getItem('USER_DATA')).agencyId;
        this.agencyList = res.result;
    }

    public updateAgency(){
        this.currentUser.agency = new AgencyModel();
        this.currentUser.agency.id = this.agencyId;
        this.employeeService.update(this.currentUser).subscribe(res => this.updateAgencyCompleted(res));
    }

    private updateAgencyCompleted(res: ResponseModel<EmployeeModel>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.currentUser = res.result;
        this.userData =  '{' +
            'agencyId: ' + '"' + this.currentUser.agency.id + '"' + ', ' +
            'email: ' + '"' + this.currentUser.email + '"' + ', ' +
            'fullname: ' + '"' + this.currentUser.fullName + '"' + ', ' +
            'password: ' + '"' + '' + '"' + ', ' +
            'role: ' + '"' + this.currentUser.role +  '"' + ', ' +
            'userModel: ' + '"' + 'EMPLOYEE' + '"' + '}';

        localStorage.setItem('USER_DATA', this.userData);
        location.reload();
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

    private findAllEmployee(){
        this.employeeService.findAll().subscribe(res => this.findAllEmployeeCompleted(res));
    }

    private findAllEmployeeCompleted(res: ResponseModel<EmployeeModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.employeeAmount = res.result.length;
    }

    private findAllCustomer(){
        this.customerService.findAll().subscribe(res => this.findAllCustomerCompleted(res));
    }

    private findAllCustomerCompleted(res: ResponseModel<CustomerModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.customerAmount = res.result.length;
    }

    public getCost(){
        const startDate = new Date(this.costStartDate);
        const endDate = new Date(this.costEndDate);
        this.countRequest = 2;

        startDate.setDate(1);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        const rangeDate = {
            fromDate: startDate.getTime(),
            toDate: endDate.getTime()
        };
        if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()){
            this.costService.getDateCost(rangeDate).subscribe(res => this.getDateCostCompleted(res));
            return;
        }

        if (startDate.getFullYear() !== endDate.getFullYear()){
            this.costService.getYearCost(rangeDate).subscribe(res => this.getYearCostCompleted(res));
            return;
        }
        this.costService.getMonthCost(rangeDate).subscribe(res => this.getCostCompleted(res));
    }

    public getRevenue(){
        const startDate = new Date(this.revenueStartDate);
        const endDate = new Date(this.revenueEndDate);
        this.countRequest = 2;

        startDate.setDate(1);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        const rangeDate = {
            fromDate: startDate.getTime(),
            toDate: endDate.getTime()
        };
        if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()){
            this.billService.getDateRevenue(rangeDate).subscribe(res => this.getDateRevenueCompleted(res));
            return;
        }

        if (startDate.getFullYear() !== endDate.getFullYear()){
            this.billService.getYearRevenue(rangeDate).subscribe(res => this.getYearRevenueCompleted(res));
            return;
        }
        this.billService.getMonthRevenue(rangeDate).subscribe(res => this.getRevenueCompleted(res));
    }


    public getCostWithOption(){
        this.countRequest = 2;
        let startDate: Date;
        let endDate: Date;
        const quarterStartMonth = this.getThisQuarter();
        switch (this.costType) {
            case '0':
                startDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
                endDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
                break;
            case '1':
                startDate = new Date(this.today.getFullYear(), quarterStartMonth, 1);
                endDate = new Date(this.today.getFullYear(), quarterStartMonth + 3, 0);
                break;
            case '2':
                startDate = new Date(this.today.getFullYear(), 0, 1);
                endDate = new Date(this.today.getFullYear(), 12, 0);
                break;
            case '4':
                startDate = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1);
                endDate = new Date(this.today.getFullYear(), this.today.getMonth(), 0);
                break;
            case '5':
                startDate = new Date(this.today.getFullYear(), quarterStartMonth - 3 , 1);
                endDate = new Date(this.today.getFullYear(), quarterStartMonth, 0);
                break;
            case '6':
                startDate = new Date(this.today.getFullYear() - 1, 0, 1);
                endDate = new Date(this.today.getFullYear() - 1, 12, 0);
                break;
        }
        this.costStartDate = new Date(startDate);
        this.costEndDate = new Date(endDate);
        const rangeDate = {
            fromDate: startDate.getTime(),
            toDate: endDate.getTime()
        };

        if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()){
            this.costService.getDateCost(rangeDate).subscribe(res => this.getDateCostCompleted(res));
            return;
        }

        this.costService.getMonthCost(rangeDate).subscribe(res => this.getCostCompleted(res));
    }

    public getRevenueWithOption(){
        this.countRequest = 2;
        let startDate: Date;
        let endDate: Date;
        const quarterStartMonth = this.getThisQuarter();
        switch (this.costType) {
            case '0':
                startDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
                endDate = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
                break;
            case '1':
                startDate = new Date(this.today.getFullYear(), quarterStartMonth, 1);
                endDate = new Date(this.today.getFullYear(), quarterStartMonth + 3, 0);
                break;
            case '2':
                startDate = new Date(this.today.getFullYear(), 0, 1);
                endDate = new Date(this.today.getFullYear(), 12, 0);
                break;
            case '4':
                startDate = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1);
                endDate = new Date(this.today.getFullYear(), this.today.getMonth(), 0);
                break;
            case '5':
                startDate = new Date(this.today.getFullYear(), quarterStartMonth - 3 , 1);
                endDate = new Date(this.today.getFullYear(), quarterStartMonth, 0);
                break;
            case '6':
                startDate = new Date(this.today.getFullYear() - 1, 0, 1);
                endDate = new Date(this.today.getFullYear() - 1, 12, 0);
                break;
        }
        this.revenueStartDate = new Date(startDate);
        this.revenueEndDate = new Date(endDate);
        const rangeDate = {
            fromDate: startDate.getTime(),
            toDate: endDate.getTime()
        };

        if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()){
            this.billService.getDateRevenue(rangeDate).subscribe(res => this.getDateRevenueCompleted(res));
            return;
        }

        this.billService.getMonthRevenue(rangeDate).subscribe(res => this.getRevenueCompleted(res));
    }

    private getCostCompleted(res: ResponseModel<MonthCostModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.costData = res.result;
        this.costTotal = 0;
        for (const item of this.costData){
            this.costTotal += item.total;
        }
        this.loadCostByMonthCompleted();
    }

    private getDateCostCompleted(res: ResponseModel<DateCostModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.costData = res.result;
        this.costTotal = 0;
        for (const item of this.costData){
            this.costTotal += item.total;
        }
        this.loadCostByDateCompleted();
    }

    private getYearCostCompleted(res: ResponseModel<YearCostModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.costData = res.result;
        this.costTotal = 0;
        for (const item of this.costData){
            this.costTotal += item.total;
        }
        this.loadCostByYearCompleted();
    }

    private getRevenueCompleted(res: ResponseModel<MonthBillModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.revenueData = res.result;
        this.revenueTotal = 0;
        for (const item of this.revenueData){
            this.revenueTotal += item.total;
        }
        this.loadRevenueByMonthCompleted();
    }

    private getDateRevenueCompleted(res: ResponseModel<DateBillModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.revenueData = res.result;
        this.revenueTotal = 0;
        for (const item of this.revenueData){
            this.revenueTotal += item.total;
        }
        this.loadRevenueByDateCompleted();
    }

    private getYearRevenueCompleted(res: ResponseModel<YearBillModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.revenueData = res.result;
        this.revenueTotal = 0;
        for (const item of this.revenueData){
            this.revenueTotal += item.total;
        }
        this.loadRevenueByYearCompleted();
    }


    private getThisQuarter(){
        const startMonth = Math.floor(this.today.getMonth() / 3) * 3;
        return startMonth;
    }

    private loadCostByMonthCompleted(){
        this.updateCostChartByMonth();

    }

    private loadCostByDateCompleted(){
        this.updateCostChartByDate();
    }

    private loadCostByYearCompleted(){
        this.updateCostChartByYear();
    }

    private loadRevenueByMonthCompleted(){
        this.updateRevenueChartByMonth();

    }

    private loadRevenueByDateCompleted(){
        this.updateRevenueChartByDate();
    }

    private loadRevenueByYearCompleted(){
        this.updateRevenueChartByYear();
    }

    private updateCostChartByMonth(){
        const costDataSet = [];
        const label = [];
        for (const item of this.costData){
            costDataSet.push(item.total);
            label.push(item.monthDate + '/' + item.yearDate);
        }

        this.costStatisticData = {
            labels: label,
            datasets: [
                {
                    label: 'Chi phí',
                    fillOpacity: .3,
                    backgroundColor: 'rgba(104,176,171,0.3)',
                    borderColor: '#006a71',
                    borderWidth: 1,
                    maxBarThickness: 20,
                    minBarThickness: 8,
                    data: costDataSet
                },
            ]
        };
    }

    private updateCostChartByYear(){
        const costDataSet = [];
        const label = [];
        for (const item of this.costData){
            costDataSet.push(item.total);
            label.push(item.year);
        }

        this.costStatisticData = {
            labels: label,
            datasets: [
                {
                    label: 'Chi phí',
                    fillOpacity: .3,
                    backgroundColor: 'rgba(104,176,171,0.3)',
                    borderColor: '#006a71',
                    borderWidth: 1,
                    maxBarThickness: 20,
                    minBarThickness: 8,
                    data: costDataSet
                },
            ]
        };
    }

    private updateCostChartByDate(){
        const costDataSet = [];
        const label = [];
        for (const item of this.costData){
            costDataSet.push(item.total);
            label.push(item.date);
        }

        this.costStatisticData = {
            labels: label,
            datasets: [
                {
                    label: 'Chi phí',
                    fillOpacity: .3,
                    backgroundColor: 'rgba(104,176,171,0.3)',
                    borderColor: '#006a71',
                    borderWidth: 1,
                    maxBarThickness: 20,
                    minBarThickness: 8,
                    data: costDataSet
                },
            ]
        };
    }

    private updateRevenueChartByMonth(){
        const costDataSet = [];
        const label = [];
        for (const item of this.revenueData){
            costDataSet.push(item.total);
            label.push(item.monthDate + '/' + item.yearDate);
        }

        this.revenueStatisticData = {
            labels: label,
            datasets: [
                {
                    label: 'Doanh thu',
                    fillOpacity: .3,
                    backgroundColor: 'rgba(0,0,0,0.29)',
                    borderColor: '#000000',
                    borderWidth: 1,
                    maxBarThickness: 20,
                    minBarThickness: 8,
                    data: costDataSet
                },
            ]
        };
    }

    private updateRevenueChartByYear(){
        const costDataSet = [];
        const label = [];
        for (const item of this.revenueData){
            costDataSet.push(item.total);
            label.push(item.year);
        }

        this.revenueStatisticData = {
            labels: label,
            datasets: [
                {
                    label: 'Doanh thu',
                    fillOpacity: .3,
                    backgroundColor: 'rgba(0,0,0,0.29)',
                    borderColor: '#000000',
                    borderWidth: 1,
                    maxBarThickness: 20,
                    minBarThickness: 8,
                    data: costDataSet
                },
            ]
        };
    }

    private updateRevenueChartByDate(){
        const costDataSet = [];
        const label = [];
        for (const item of this.revenueData){
            costDataSet.push(item.total);
            label.push(item.date);
        }

        this.revenueStatisticData = {
            labels: label,
            datasets: [
                {
                    label: 'Doanh thu',
                    fillOpacity: .3,
                    backgroundColor: 'rgba(0,0,0,0.29)',
                    borderColor: '#000000',
                    borderWidth: 1,
                    maxBarThickness: 20,
                    minBarThickness: 8,
                    data: costDataSet
                },
            ]
        };
    }
}
