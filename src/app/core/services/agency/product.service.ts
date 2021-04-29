import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {ProductModel} from '../../../data/schema/product.model';
import {ProductFullModel} from '../../../data/schema/product-full.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends AgencyBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/product/findAll');
    }

    public findAllFull(): Observable<any> {
        return this.get('/api/v1/product/fullList');
    }

    public findAllFullByCateId(cateId: string): Observable<any> {
        return this.get('/api/v1/product/fullListByCate', {cateId});
    }

    public find(search: BaseSearchModel<ProductModel[]>): Observable<any> {
        return this.post('/api/v1/product/find', search);
    }

    public getOneById(id: string): Observable<any> {
        return this.get('/api/v1/product/' + id);
    }

    public getFullById(id: string): Observable<any> {
        return this.get('/api/v1/product/get-full/' + id);
    }

    public getLikeSlugOrName(name: string): Observable<any> {
        return this.get('/api/v1/product/like-slug-name', {name});
    }

    public getLikeSlug(slug: string): Observable<any> {
        return this.get('/api/v1/product/like-slug', {slug});
    }

    public getById(id: string[]): Observable<any> {
        return this.post('/api/v1/product/list', id);
    }

    public save(product: ProductFullModel): Observable<any> {
        return this.post('/api/v1/product/insert', product);
    }

    public update(product: ProductFullModel): Observable<any> {
        return this.put('/api/v1/product/update', product);
    }

    public deleteProduct(id: string): Observable<any> {
        return this.delete('/api/v1/product/delete', {id});
    }
}
