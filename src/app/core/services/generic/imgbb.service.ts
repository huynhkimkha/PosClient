import {Injectable} from '@angular/core';
import {AgencyBaseService} from './agency-base.service';
import {Observable} from 'rxjs';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {CategoryModel} from '../../../data/schema/category.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ResponseModel} from '../../../data/schema/response.model';

@Injectable({
    providedIn: 'root'
})
export class ImgbbService  {
    private apiKey = 'e2ac76f7f4b7e255dbe14c6cf5a60d7e';
    constructor(
        private readonly http: HttpClient
    ) {}

    upload(file: File): Observable<any>{
        const formData = new FormData();
        formData.append('image', file);

        return this.http
            .post('/upload', formData, {params: {key: this.apiKey}})
            .pipe(map((response: any) => response));
    }
}
