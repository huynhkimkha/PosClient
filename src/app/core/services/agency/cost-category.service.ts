import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CostCategoryService extends AgencyBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/cost-category/findAll');
    }
}
