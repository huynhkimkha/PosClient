import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../../shared/shared.module';
import {AppAddBillComponent} from './app-add-bill.component';
import {BillModule} from '../../bill.module';
import {AppAddPromotionBillComponent} from '../../../../../shared/components/popups/add-promotion-bill/app-add-promotion-bill.component';

const COMPONENTS = [
];
export const routes: Routes = [
    {
        path: '',
        component: AppAddBillComponent
    },
];

@NgModule({
    declarations: [
        AppAddBillComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class AddBillModule {
}
