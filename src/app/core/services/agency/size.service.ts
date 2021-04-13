import {Injectable} from '@angular/core';
import {AgencyBaseService} from '../generic/agency-base.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SizeService extends AgencyBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/size/findAll');
    }
}
