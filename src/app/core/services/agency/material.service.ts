import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {MaterialModel} from '../../../data/schema/material.model';

@Injectable({
    providedIn: 'root'
})
export class MaterialService extends AgencyBaseService {
    public findOne(id: string): Observable<any> {
        return this.get('/api/v1/material/findOne', {id});
    }

    public findAll(): Observable<any> {
        return this.get('/api/v1/material/findAll');
    }

    public find(search: BaseSearchModel<MaterialModel[]>): Observable<any> {
        return this.post('/api/v1/material/find', search);
    }

    public save(material: MaterialModel): Observable<any> {
        return this.post('/api/v1/material/insert', material);
    }

    public update(material: MaterialModel): Observable<any> {
        return this.put('/api/v1/material/update', material);
    }

    public deleteMaterial(id: string): Observable<any> {
        return this.delete('/api/v1/material/delete', {id});
    }

    public getLikeName(name: string): Observable<any> {
        return this.get('/api/v1/material/like-name', {name});
    }
}
