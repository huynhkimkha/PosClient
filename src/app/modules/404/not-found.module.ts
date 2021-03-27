import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found.component';
import {SharedModule} from '../../shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  },
];

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule {
}
