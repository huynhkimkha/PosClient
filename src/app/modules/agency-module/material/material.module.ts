import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialComponent} from './pages/material.component';
import {AppUpdateMaterialComponent} from './components/update-material/app-update-material.component';

const COMPONENTS = [
    AppUpdateMaterialComponent
];

export const routes: Routes = [
    {
        path: '',
        component: MaterialComponent
    },
];

@NgModule({
    declarations: [
        MaterialComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class MaterialModule {
}
