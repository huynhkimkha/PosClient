import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {AgencyBaseService} from '../generic/agency-base.service';
import {CustomerModel} from '../../../data/schema/customer.model';
@Injectable({
    providedIn: 'root'
})
export class CustomerService extends AgencyBaseService {
    public findOne(id: string): Observable<any> {
        return this.get('/api/v1/customer/findOne', {id});
    }

    public findAll(): Observable<any> {
        return this.get('/api/v1/customer/findAll');
    }

    public find(search: BaseSearchModel<CustomerModel[]>): Observable<any> {
        return this.post('/api/v1/customer/find', search);
    }

    public save(customer: CustomerModel): Observable<any> {
        return this.post('/api/v1/customer/insert', customer);
    }

    public update(customer: CustomerModel): Observable<any> {
        return this.put('/api/v1/customer/update', customer);
    }

    public deleteCustomer(id: string): Observable<any> {
        return this.delete('/api/v1/customer/delete', {id});
    }

    public getLikeName(name: string): Observable<any> {
        return this.get('/api/v1/customer/like-name', {name});
    }
}
