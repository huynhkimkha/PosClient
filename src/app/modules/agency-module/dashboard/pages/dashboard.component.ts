import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {
    private today: Date = new Date();

    constructor(
    ) {
    }

    ngAfterViewInit() {
    }
}
