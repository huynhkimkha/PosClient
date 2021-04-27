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
    {
        path: 'category',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./category/category.module').then((m) => m.CategoryModule),
            },
        ],
    },
    {
        path: 'product',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./product/product.module').then((m) => m.ProductModule),
            },
        ],
    },
    {
        path: 'promotion',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./promotion/promotion.module').then((m) => m.PromotionModule),
            },
        ],
    },
    {
        path: 'add-bill',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./bill/components/add-bill/addBill.module').then((m) => m.AddBillModule),
            },
        ],
    },
{
    path: 'material',
        children: [
    {
        path: '',
        loadChildren: () =>
            import('./material/material.module').then((m) => m.MaterialModule),
    },
],
},
    {
        path: 'inventory',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./inventory/inventory.module').then((m) => m.InventoryModule),
            },
        ],
    },
    {
        path: 'importing-material',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./importing-material/importing-material.module').then((m) => m.ImportingMaterialModule),
            },
        ],
    },
    {
        path: 'cost-category',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./cost-category/cost-category.module').then((m) => m.CostCategoryModule),
            },
        ],
    },
    {
        path: 'bill',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./bill/bill.module').then((m) => m.BillModule),
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
