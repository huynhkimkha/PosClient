import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CostCategoryComponent} from './pages/cost-category.component';
import {AppAddCostCategoryComponent} from './components/add-cost-category/app-add-cost-category.component';
import {AppUpdateCostCategoryComponent} from './components/update-cost-category/app-update-cost-category.component';

const COMPONENTS = [
    AppAddCostCategoryComponent,
    AppUpdateCostCategoryComponent
];
export const routes: Routes = [
    {
        path: '',
        component: CostCategoryComponent
    },
];

@NgModule({
    declarations: [
        CostCategoryComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class CostCategoryModule {
}
