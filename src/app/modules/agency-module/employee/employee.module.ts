import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {EmployeeComponent} from './pages/employee.component';
import {AppAddEmployeeComponent} from './components/add-employee/app-add-employee.component';
import {AppUpdateEmployeeComponent} from './components/update-employee/app-update-employee.component';

const COMPONENTS = [
    AppAddEmployeeComponent,
    AppUpdateEmployeeComponent
];
export const routes: Routes = [
    {
        path: '',
        component: EmployeeComponent
    },
];

@NgModule({
    declarations: [
        EmployeeComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class EmployeeModule {
}
