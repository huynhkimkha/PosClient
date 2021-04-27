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
import {EmployeeService} from "../../../../core/services/agency/employee.service";
import {EmployeeModel} from "../../../../data/schema/employee.model";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {
    private today: Date = new Date();
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

    public USER_PERMISSION_CODE = USER_PERMISSION_CODE;

    private countRequest: number;
    private costData: any;
    public costStatisticData: any;
    public currentUser: EmployeeModel = new EmployeeModel();

    constructor(
        private alert: AppAlert,
        private loading: AppLoading,
        private modal: AppModals,
        private cdr: ChangeDetectorRef,
        private costService: CostService,
        public currentUserService: CurrentUserService,
        private employeeService: EmployeeService
    ) {
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
        this.getCost();
        this.getCurrentUserByEmail();
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

    private getCostCompleted(res: ResponseModel<MonthCostModel[]>){
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }
        this.costData = res.result;
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
        this.loadCostByYearCompleted();
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
        console.log(this.costStatisticData);
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
}
