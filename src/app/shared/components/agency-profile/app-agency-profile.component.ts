import {Component} from '@angular/core';
import {AUTH_CONSTANT} from '../../../core/constant/auth.constant';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../../core/services/agency/current-user.service';

@Component({
  selector: 'app-agency-profile',
  templateUrl: './app-agency-profile.component.html'
})
export class AppAgencyProfileComponent {
  public fullName: string;

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
  ) {
    this.fullName = currentUserService.getFullName();
  }

  public logout() {
    localStorage.removeItem(AUTH_CONSTANT.AUTH_KEY);
    this.router.navigateByUrl('/login');
  }

  public changePassword() {
    this.router.navigateByUrl('/change-password');
  }
}
