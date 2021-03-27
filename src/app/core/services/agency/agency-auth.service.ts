import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AgencyBaseService} from '../generic/agency-base.service';
import {LoginModel} from '../../../data/schema/login.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyAuthService extends AgencyBaseService {
  public login(login: LoginModel): Observable<any> {
    return this.post('/api/v1/auth/login', login);
  }
}
