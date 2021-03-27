import {Injectable} from '@angular/core';

declare var moment: any;

@Injectable({
  providedIn: 'root'
})
export class AppCommon {
  public isReg(pattern, val): boolean {
    const reg = new RegExp(pattern);
    return reg.test(val);
  }

  public getTimeStampFromDate(val: string, format?: string): string {
    const formatF = format ? format : 'YYYY-MM-DD';
    return moment(val, formatF).valueOf();
  }

  public getTimeStampFromDateTime(val: string, format?: string): string {
    const formatF = format ? format : 'YYYY-MM-DD HH:mm:ss';
    return moment(val, formatF).valueOf();
  }

  public getDateFromTimeStamp(val: string, format?: string): string{
    const formatF = format ? format : 'DD/MM/YYYY';
    return moment(val).format(formatF);
  }
}
