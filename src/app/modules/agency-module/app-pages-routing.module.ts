import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
        ],
    },
    {
        path: 'home',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
        ],
    },
    {
        path: 'employee',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./employee/employee.module').then((m) => m.EmployeeModule),
            },
        ],
    },
    {
        path: 'customer',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./customer/customer.module').then((m) => m.CustomerModule),
            },
        ],
    },
    {
        path: 'agency',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./agency/agency.module').then((m) => m.AgencyModule),
            },
        ],
    },
    {
        path: 'cost',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./cost/cost.module').then((m) => m.CostModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppPagesRoutingModule {
}
