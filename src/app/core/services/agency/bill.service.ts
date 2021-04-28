import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BillFullModel} from '../../../data/schema/bill-full.model';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {BillModel} from '../../../data/schema/bill.model';
import {RangeDateModel} from '../../../data/schema/range-date.model';

@Injectable({
    providedIn: 'root'
})
export class BillService extends AgencyBaseService {
    // public findAll(): Observable<any> {
    //     return this.get('/api/v1/categories/findAll');
    // }
    //
    public find(search: BaseSearchModel<BillModel[]>): Observable<any> {
        return this.post('/api/v1/bill/find', search);
    }

    // public getById(id: string): Observable<any> {
    //     return this.get('/api/v1/categories/' + id);
    // }
    //
    // public getLikeName(name: string): Observable<any> {
    //     return this.get('/api/v1/categories/like-name', {name});
    // }

    public save(billFull: BillFullModel): Observable<any> {
        return this.post('/api/v1/bill/insert', billFull);
    }

    public getNumber(createdDate: string): Observable<any> {
        return this.get('/api/v1/bill/get-number/' + createdDate);
    }

    // public update(categoryModel: CategoryModel): Observable<any> {
    //     return this.put('/api/v1/categories/update', categoryModel);
    // }
    //
    public deleteBill(id: string): Observable<any> {
        return this.delete('/api/v1/bill/delete', {id});
    }

    public getBillStatistic(rangeDate: RangeDateModel){
        return this.post('/api/v1/bill/getBillStatistic', rangeDate);
    }

    public getDateRevenue(rangeDate: RangeDateModel){
        return this.post('/api/v1/bill/getDateBill', rangeDate);
    }

    public getMonthRevenue(rangeDate: RangeDateModel){
        return this.post('/api/v1/bill/getMonthBill', rangeDate);
    }

    public getYearRevenue(rangeDate: RangeDateModel){
        return this.post('/api/v1/bill/getYearBill', rangeDate);
    }
}
