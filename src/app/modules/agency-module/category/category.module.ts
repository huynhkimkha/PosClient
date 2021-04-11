import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CategoryComponent} from './pages/category.component';
import {AppAddCategoryComponent} from './components/add-category/app-add-category.component';
import {AppUpdateCategoryComponent} from './components/update-category/app-update-category.component';

const COMPONENTS = [
    AppAddCategoryComponent,
    AppUpdateCategoryComponent
];

export const routes: Routes = [
    {
        path: '',
        component: CategoryComponent
    },
];

@NgModule({
    declarations: [
        CategoryComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class CategoryModule {
}
