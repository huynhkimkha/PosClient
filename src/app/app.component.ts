import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AUTH_CONSTANT } from './core/constant/auth.constant';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}

  private anonymousUrls = ['/login', '/404', '/403'];

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.handleNavigation(event);
      }
    });
  }

  private handleNavigation(event: NavigationStart) {
    const auth = localStorage.getItem(AUTH_CONSTANT.AUTH_KEY);
    const notAuth = !auth || auth === 'undefined';
    const isIgnoreAuth = this.isIgnoreAuth(event.url);

    if (notAuth) {
      // this.handleNotAuth(isIgnoreAuth);
    } else {
      this.handleAuth(event.url, isIgnoreAuth);
    }
  }

  private handleNotAuth(isIgnoreAuth: boolean) {
    if (!isIgnoreAuth) {
      this.router.navigateByUrl('/login');
    }
  }
  private handleAuth(url: string, isIgnoreAuth: boolean) {
    if (url === '/login') {
      this.router.navigateByUrl('/');
      return;
    }
  }

  private isIgnoreAuth(url: string): boolean {
    url = url.includes('/login') ? '/login' : url;
    return this.anonymousUrls.indexOf(url) !== -1;
  }
}
