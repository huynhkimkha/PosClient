import {Injectable} from '@angular/core';

declare var toastr: any;

@Injectable()
export class AppAlert {
  public error(message: string) {
    toastr.error(message);
  }

  public warn(message: string) {
    toastr.warning(message);
  }

  public info(message: string) {
    toastr.info(message);
  }

  public success(message: string) {
    toastr.success(message);
  }
}
