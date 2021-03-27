import {AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-modal-wrapper',
    templateUrl: './app-modal-wrapper.component.html'
})
export class AppModalWrapperComponent implements AfterViewChecked {
    @Input() title = '';
    // modal-sm, modal-lg or modal-xl
    @Input() size = 'modal-lg';
    @Input() appendToBody = false;

    @Output() hideEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() showEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() confirmEvent: EventEmitter<any> = new EventEmitter<any>();

    private el: any;

    constructor(private root: ElementRef) {
    }

    ngAfterViewChecked() {
        if (!this.el) {
            this.el = $(this.root.nativeElement.querySelector('.modal'));
        }

        this.el.on('shown.bs.modal', () => {
            this.showEvent.emit();
        });

        this.el.on('shown.bs.modal', () => {
            this.showEvent.emit();
        });

        this.el.on('hidden.bs.modal', (e) => {
            this.hideEvent.emit();
            // To fix miss scroll popup when open many popup
            $('.modal').css('overflow-y', 'auto');
        });
    }

    public hide() {
        this.el.modal('hide');
    }

    public show() {
        this.el.modal('show');
        if (this.appendToBody) {
            this.el.appendTo('body');
        }
    }
}
