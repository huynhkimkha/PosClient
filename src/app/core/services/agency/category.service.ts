import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {CustomerModel} from '../../../data/schema/customer.model';
import {CategoryModel} from '../../../data/schema/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends AgencyBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/categories/findAll');
    }

    public find(search: BaseSearchModel<CategoryModel[]>): Observable<any> {
        return this.post('/api/v1/categories/find', search);
    }

    public getById(id: string): Observable<any> {
        return this.get('/api/v1/categories/' + id);
    }

    public getLikeName(name: string): Observable<any> {
        return this.get('/api/v1/categories/like-name', {name});
    }

    public save(categoryModel: CategoryModel): Observable<any> {
        return this.post('/api/v1/categories/insert', categoryModel);
    }

    public update(categoryModel: CategoryModel): Observable<any> {
        return this.put('/api/v1/categories/update', categoryModel);
    }

    public deleteCategory(id: string): Observable<any> {
        return this.delete('/api/v1/categories/delete', {id});
    }
}
