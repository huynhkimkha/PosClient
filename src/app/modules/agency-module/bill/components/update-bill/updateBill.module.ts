import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../../shared/shared.module';
import {AppUpdateBillComponent} from './app-update-bill.component';

const COMPONENTS = [
];
export const routes: Routes = [
    {
        path: '',
        component: AppUpdateBillComponent
    },
];

@NgModule({
    declarations: [
        AppUpdateBillComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class UpdateBillModule {
}
