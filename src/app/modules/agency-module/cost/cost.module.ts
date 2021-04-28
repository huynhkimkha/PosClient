import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CostComponent} from '../cost/pages/cost.component';
import {AppAddCostComponent} from './components/add-cost/app-add-cost.component';
import {AppUpdateCostComponent} from './components/update-cost/app-update-cost.component';
import {AppCostStatisticComponent} from './components/cost-statistic/app-cost-statistic.component';

const COMPONENTS = [
    AppAddCostComponent,
    AppUpdateCostComponent,
    AppCostStatisticComponent
];

export const routes: Routes = [
    {
        path: '',
        component: CostComponent
    },
];

@NgModule({
    declarations: [
        CostComponent,
        ...COMPONENTS
    ],
    exports: [
        AppCostStatisticComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class CostModule {
}
