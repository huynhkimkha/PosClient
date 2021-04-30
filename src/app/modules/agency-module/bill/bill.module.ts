import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {BillComponent} from './pages/bill.component';
import {AppBillStatisticComponent} from './components/bill-statistic/app-bill-statistic.component';

const COMPONENTS = [
    AppBillStatisticComponent,
];

export const routes: Routes = [
    {
        path: '',
        component: BillComponent
    },
];

@NgModule({
    declarations: [
        BillComponent,
        ...COMPONENTS,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class BillModule {
}
