import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {PromotionComponent} from './pages/promotion.component';
import {AppAddPromotionComponent} from './components/add-promotion/app-add-promotion.component';
import {AppUpdatePromotionComponent} from "./components/update-promotion/app-update-promotion.component";

const COMPONENTS = [
    AppAddPromotionComponent,
    AppUpdatePromotionComponent
];
export const routes: Routes = [
    {
        path: '',
        component: PromotionComponent
    },
];

@NgModule({
    declarations: [
        PromotionComponent,
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class PromotionModule {
}
