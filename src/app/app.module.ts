import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule, routedComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './partials/partials/navbar/navbar.component';
import {AppFooterComponent} from './partials/partials/footer/app-footer.component';

import * as Utils from './shared/utils';
import * as Services from './core/services';

import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

const UTILS_PROVIDERS = [
  Utils.AppModals,
  Utils.AppLoading,
  Utils.AppAlert,
  Utils.AppGuid
];

const PARTIALS = [
  NavbarComponent,
  AppFooterComponent
];

@NgModule({
  declarations: [
    AppComponent,
    PARTIALS,
    ...routedComponents
  ],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,

    // Core & Shared
    CoreModule,
    SharedModule,

    // App
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Services.CustomHandleInterceptor,
      multi: true
    },
    ...UTILS_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
