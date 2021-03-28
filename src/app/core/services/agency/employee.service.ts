import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {EmployeeModel} from '../../../data/schema/employee.model';
import {AgencyBaseService} from '../generic/agency-base.service';
@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends AgencyBaseService {
    public findOne(employeeId: string): Observable<any> {
        return this.get('/api/v1/employee/findOne', {employeeId});
    }

    public findAll(): Observable<any> {
        return this.get('/api/v1/employee/findAll');
    }

    public find(search: BaseSearchModel<EmployeeModel[]>): Observable<any> {
        return this.post('/api/v1/employee/find', search);
    }

    public save(employee: EmployeeModel): Observable<any> {
        return this.post('/api/v1/employee/insert', employee);
    }

    public update(employee: EmployeeModel): Observable<any> {
        return this.put('/api/v1/employee/update', employee);
    }

    public deleteEmployee(id: string): Observable<any> {
        return this.delete('/api/v1/employee/delete', {id});
    }

    public getEmployeeByEmail(email: string): Observable<any> {
        return this.get('/api/v1/employee/getEmployeeByEmail', {email});
    }
}
