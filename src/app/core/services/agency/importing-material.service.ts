import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {ImportingMaterialModel} from '../../../data/schema/importing-material.model';
import {ImportingMaterialFullModel} from '../../../data/schema/importing-material-full.model';

@Injectable({
    providedIn: 'root'
})
export class ImportingMaterialService extends AgencyBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/importing-material/findAll');
    }

    public find(search: BaseSearchModel<ImportingMaterialModel[]>): Observable<any> {
        return this.post('/api/v1/importing-material/find', search);
    }

    public getFullById(id: string): Observable<any> {
        return this.get('/api/v1/importing-material/get-full/' + id);
    }

    public save(importingMaterial: ImportingMaterialFullModel): Observable<any> {
        return this.post('/api/v1/importing-material/insert', importingMaterial);
    }

    public update(importingMaterial: ImportingMaterialFullModel): Observable<any> {
        return this.put('/api/v1/importing-material/update', importingMaterial);
    }

    public deleteImportingMaterial(id: string): Observable<any> {
        return this.delete('/api/v1/importing-material/delete', {id});
    }

    public getNumber(createdDate: string): Observable<any> {
        return this.get('/api/v1/importing-material/get-number/' + createdDate);
    }
}
