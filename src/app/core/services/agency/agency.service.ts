import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {AgencyModel} from '../../../data/schema/agency.model';

@Injectable({
    providedIn: 'root'
})
export class AgencyService extends AgencyBaseService {
    public findOne(id: string): Observable<any> {
        return this.get('/api/v1/agency/findOne', {id});
    }

    public findAll(): Observable<any> {
        return this.get('/api/v1/agency/findAll');
    }

    public find(search: BaseSearchModel<AgencyModel[]>): Observable<any> {
        return this.post('/api/v1/agency/find', search);
    }

    public save(agency: AgencyModel): Observable<any> {
        return this.post('/api/v1/agency/insert', agency);
    }

    public update(agency: AgencyModel): Observable<any> {
        return this.put('/api/v1/agency/update', agency);
    }

    public deleteAgency(id: string): Observable<any> {
        return this.delete('/api/v1/agency/delete', {id});
    }
}
