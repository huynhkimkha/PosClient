import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ProductComponent} from './pages/product.component';
import {AppAddProductComponent} from './components/add-product/app-add-product.component';
import {AppUpdateProductComponent} from './components/update-product/app-update-product.component';

const COMPONENTS = [
    AppAddProductComponent,
    AppUpdateProductComponent
];
export const routes: Routes = [
    {
        path: '',
        component: ProductComponent
    },
];

@NgModule({
    declarations: [
        ProductComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ProductModule {
}
