import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class GenericService {
  constructor(
    protected http: HttpClient
  ) {}

  protected getParams(body: object) {
    let params = new HttpParams();
    if (body) {
      Object.keys(body).forEach((item) => {
        params = params.set(item, body[item]);
      });
    }

    return params;
  }

}
