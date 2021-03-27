import { Injectable } from '@angular/core';
import { AgencyBaseService } from '../generic/agency-base.service';
import { Observable } from 'rxjs';
import {SettingModel} from '../../../data/schema/setting.model';

@Injectable({
    providedIn: 'root',
})
export class SettingService extends AgencyBaseService {
    public getWarehouseId(): Observable<any> {
        return this.get('/api/v1/setting/warehouseId', {});
    }

    public findAll(): Observable<any> {
        return this.get('/api/v1/setting/findAll', {});
    }

    public update(settings: SettingModel[]): Observable<any> {
        return this.put('/api/v1/setting/update', settings);
    }
}
