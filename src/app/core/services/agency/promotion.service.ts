import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {PromotionModel} from '../../../data/schema/promotion.model';
import {PromotionFullModel} from '../../../data/schema/promotion-full.model';

@Injectable({
    providedIn: 'root'
})
export class PromotionService extends AgencyBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/promotion/findAll');
    }

    public find(search: BaseSearchModel<PromotionModel[]>): Observable<any> {
        return this.post('/api/v1/promotion/find', search);
    }

    public getFullById(id: string): Observable<any> {
        return this.get('/api/v1/promotion/get-full/' + id);
    }

    public save(promotion: PromotionFullModel): Observable<any> {
        return this.post('/api/v1/promotion/insert', promotion);
    }

    public update(promotion: PromotionFullModel): Observable<any> {
        return this.put('/api/v1/promotion/update', promotion);
    }

    public deletePromotion(id: string): Observable<any> {
        return this.delete('/api/v1/promotion/delete', {id});
    }
}
