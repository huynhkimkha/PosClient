import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {InventoryComponent} from './pages/inventory.component';
import {AppAddInventoryComponent} from './components/add-inventory/app-add-inventory.component';
import {AppUpdateInventoryComponent} from './components/update-inventory/app-update-inventory.component';

const COMPONENTS = [
    AppAddInventoryComponent,
    AppUpdateInventoryComponent
];

export const routes: Routes = [
    {
        path: '',
        component: InventoryComponent
    },
];

@NgModule({
    declarations: [
        InventoryComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class InventoryModule {
}
