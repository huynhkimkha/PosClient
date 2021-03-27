import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {AccessDeniedComponent} from './pages/access-denied.component';

export const routes: Routes = [
  {
    path: '',
    component: AccessDeniedComponent
  },
];

@NgModule({
  declarations: [
    AccessDeniedComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AccessDeniedModule {
}
