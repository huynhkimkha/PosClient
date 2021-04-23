import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule, ChartModule} from 'primeng';

// Pipes

// Components
import {AppAgencyProfileComponent} from './components/agency-profile/app-agency-profile.component';
import {AppDataTableComponent} from './components/data-table/app-data-table.component';
import {AppDateTimeControlComponent} from './components/date/app-date-time-control.component';
import {AppDateControlComponent} from './components/date/app-date-control.component';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {AppExportComponent} from './components/export/app-export.component';
import {AppModalWrapperComponent} from './components/modal-wrapper/app-modal-wrapper.component';
import {AppSelect2ControlComponent} from './components/select2/app-select2-control.component';
import {AppAddCustomerComponent} from './components/popups/add-customer/app-add-customer.component';
import {AppAddCostCategoryComponent} from './components/popups/add-cost-category/app-add-cost-category.component';
import {AppAddMaterialComponent} from './components/popups/add-material/app-add-material.component';
import {AppAddProductComponent} from './components/popups/add-product/app-add-product.component';

const COMPONENTS = [
  AppAgencyProfileComponent,
  AppDataTableComponent,
  AppDateTimeControlComponent,
  AppDateControlComponent,
  DropdownMenuComponent,
  AppExportComponent,
  AppModalWrapperComponent,
  AppSelect2ControlComponent,
    AppAddCustomerComponent,
    AppAddCostCategoryComponent,
    AppAddMaterialComponent,
    AppAddProductComponent
];

const PIPES = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    AutoCompleteModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    FormsModule,
    ChartModule,
    AutoCompleteModule
  ]
})
export class SharedModule {
}
