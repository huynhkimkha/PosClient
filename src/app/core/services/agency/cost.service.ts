import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {CostModel} from '../../../data/schema/cost.model';

@Injectable({
    providedIn: 'root'
})
export class CostService extends AgencyBaseService {
    public findOne(id: string): Observable<any> {
        return this.get('/api/v1/cost/findOne', {id});
    }

    public findAll(): Observable<any> {
        return this.get('/api/v1/cost/findAll');
    }

    public find(search: BaseSearchModel<CostModel[]>): Observable<any> {
        return this.post('/api/v1/cost/find', search);
    }

    public save(cost: CostModel): Observable<any> {
        return this.post('/api/v1/cost/insert', cost);
    }

    public update(cost: CostModel): Observable<any> {
        return this.put('/api/v1/cost/update', cost);
    }

    public deleteCost(id: string): Observable<any> {
        return this.delete('/api/v1/cost/delete', {id});
    }

    public getNumber(createdDate: string): Observable<any> {
        return this.get('/api/v1/cost/get-number/' + createdDate);
    }
}
