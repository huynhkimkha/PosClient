import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CustomerComponent} from './pages/customer.component';
import {AppUpdateCustomerComponent} from './components/update-customer/app-update-customer.component';

const COMPONENTS = [
    AppUpdateCustomerComponent
];
export const routes: Routes = [
    {
        path: '',
        component: CustomerComponent
    },
];

@NgModule({
    declarations: [
        CustomerComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class CustomerModule {
}
