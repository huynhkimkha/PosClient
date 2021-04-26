import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ImportingMaterialComponent} from './pages/importing-material.component';
import {AppAddImportingMaterialComponent} from './components/add-importing-material/app-add-importing-material.component';
import {AppUpdateImportingMaterialComponent} from './components/update-importing-material/app-update-importing-material.component';

const COMPONENTS = [
    AppAddImportingMaterialComponent,
    AppUpdateImportingMaterialComponent
];
export const routes: Routes = [
    {
        path: '',
        component: ImportingMaterialComponent
    },
];

@NgModule({
    declarations: [
        ImportingMaterialComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ImportingMaterialModule {
}
