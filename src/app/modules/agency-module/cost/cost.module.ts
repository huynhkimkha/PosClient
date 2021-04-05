import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CostComponent} from '../cost/pages/cost.component';
import {AppAddCostComponent} from './components/add-cost/app-add-cost.component';
import {AppUpdateCostComponent} from './components/update-cost/app-update-cost.component';

const COMPONENTS = [
    AppAddCostComponent,
    AppUpdateCostComponent
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
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class CostModule {
}
