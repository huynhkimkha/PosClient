import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginModel} from '../../../data/schema/login.model';
import {AppAlert, AppLoading} from '../../../shared/utils';
import {AgencyAuthService} from '../../../core/services';
import {ResponseModel} from '../../../data/schema/response.model';
import {JwtResponseModel} from '../../../data/schema/jwt-response.model';
import {HTTP_CODE_CONSTANT} from '../../../core/constant/http-code.constant';
import {AUTH_CONSTANT} from '../../../core/constant/auth.constant';
import {CurrentUserService} from '../../../core/services/agency/current-user.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginModel: LoginModel = new LoginModel();

  constructor(
    private loading: AppLoading,
    private alert: AppAlert,
    private agencyAuthService: AgencyAuthService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    $('body').addClass('login-page adi-background-guest');
  }

  ngOnInit() {
  }

  public enterEvent($keyBoard: KeyboardEvent = null) {
    if ($keyBoard != null && $keyBoard.key === 'Enter') {
      this.login();
    }
  }

  public login() {
    this.loading.show();
    this.agencyAuthService.login(this.loginModel).subscribe(res => this.loginCompleted(res));
  }



  private loginCompleted(res: ResponseModel<JwtResponseModel>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    const user = res.result.user;
    this.currentUserService.setUser(user);
    localStorage.setItem(AUTH_CONSTANT.USER_DATA, JSON.stringify(user));
    this.alert.success('Đăng nhập thành công');

    this.router.navigateByUrl('/');
  }
}
