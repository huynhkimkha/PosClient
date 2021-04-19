import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {InventoryModel} from '../../../data/schema/inventory.model';

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends AgencyBaseService {
    public findOne(id: string): Observable<any> {
        return this.get('/api/v1/inventory/findOne', {id});
    }

    public findAll(): Observable<any> {
        return this.get('/api/v1/inventory/findAll');
    }

    public find(search: BaseSearchModel<InventoryModel[]>): Observable<any> {
        return this.post('/api/v1/inventory/find', search);
    }

    public save(inventory: InventoryModel): Observable<any> {
        return this.post('/api/v1/inventory/insert', inventory);
    }

    public update(inventory: InventoryModel): Observable<any> {
        return this.put('/api/v1/inventory/update', inventory);
    }

    public deleteInventory(id: string): Observable<any> {
        return this.delete('/api/v1/inventory/delete', {id});
    }
}
