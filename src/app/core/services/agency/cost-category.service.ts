import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {CostCategoryModel} from '../../../data/schema/cost-category.model';

@Injectable({
    providedIn: 'root'
})
export class CostCategoryService extends AgencyBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/cost-category/findAll');
    }

    public findOne(id: string): Observable<any> {
        return this.get('/api/v1/cost-category/findOne', {id});
    }

    public find(search: BaseSearchModel<CostCategoryModel[]>): Observable<any> {
        return this.post('/api/v1/cost-category/find', search);
    }

    public save(CostCategory: CostCategoryModel): Observable<any> {
        return this.post('/api/v1/cost-category/insert', CostCategory);
    }

    public update(CostCategory: CostCategoryModel): Observable<any> {
        return this.put('/api/v1/cost-category/update', CostCategory);
    }

    public deleteCostCategory(id: string): Observable<any> {
        return this.delete('/api/v1/cost-category/delete', {id});
    }
}
