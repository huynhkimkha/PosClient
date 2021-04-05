import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AgencyComponent} from './pages/agency.component';
import {AppAddAgencyComponent} from './components/add-agency/app-add-agency.component';
import {AppUpdateAgencyComponent} from './components/update-agency/app-update-agency.component';

const COMPONENTS = [
    AppAddAgencyComponent,
    AppUpdateAgencyComponent
];
export const routes: Routes = [
    {
        path: '',
        component: AgencyComponent
    },
];

@NgModule({
    declarations: [
        AgencyComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AgencyModule {
}
