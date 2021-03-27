import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

const BASE_URL = environment.agencyBaseUrl;

@Injectable()
export class AgencyBaseService extends GenericService {
  protected get(url: string, body?: object): Observable<any> {
    return  this.http.get(BASE_URL + url, {
      params: this.getParams(body)
    });
  }

  protected post(url: string, body: object): Observable<any> {
    return this.http.post(BASE_URL + url, body);
  }

  protected put(url: string, body: object): Observable<any> {
    return this.http.put(BASE_URL + url, body);
  }

  protected delete(url: string, body?: object): Observable<any> {
    return this.http.delete(BASE_URL + url, {
      params: this.getParams(body)
    });
  }
}
