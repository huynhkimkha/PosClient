import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select2ControlModel} from '../../../data/data-components/select2-control.model';

declare var $: any;

@Component({
  selector: 'app-select2-control',
  templateUrl: './app-select2-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelect2ControlComponent),
      multi: true
    }
  ]
})
export class AppSelect2ControlComponent implements AfterViewInit, ControlValueAccessor {
  @Input() label = '';
  @Input() id: string;
  @Input() dataPlaceHolder = '';
  @Input() multiple = false;

  @Output() changeEvent: EventEmitter<Select2ControlModel[]> = new EventEmitter<Select2ControlModel[]>();

  private elementRf: any = null;

  private valueV: Select2ControlModel[] = [];

  constructor(
    private root: ElementRef
  ) {
  }

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.valueV) {
      this.valueV = value;
      this.initUI();
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngAfterViewInit() {
    this.initUI();
  }

  get value(): any {
    return this.valueV;
  }
  @Input()
  set value(v) {
    if (v !== this.valueV) {
      this.valueV = v;
      this.initUI();
    }
  }

  private initUI() {
    if (this.elementRf == null) {
      this.elementRf = $(this.root.nativeElement.querySelector('select'));
      this.elementRf.attr('data-placeholder', this.dataPlaceHolder);
    }

    this.selectOption();
    this.elementRf.select2();
    this.unBindEvent();
    this.bindEvent();
  }

  private bindEvent() {
    this.elementRf.on('select2:select', (e) => { this.onSelect(e); });
    this.elementRf.on('select2:unselect', (e) => { this.onUnSelect(e); });
  }

  private unBindEvent() {
    this.elementRf.off('select2:select');
    this.elementRf.off('select2:unselect');
  }

  private onSelect(e: any) {
    const value = new Select2ControlModel();
    value.id = e.params.data.id;
    value.text = e.params.data.text;
    value.title = e.params.data.title;
    value.selected = e.params.data.selected;
    value.disabled = e.params.data.disabled;

    if (!this.multiple) {
      this.valueV = [];
    }

    this.valueV.push(value);
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private onUnSelect(e: any) {
    this.valueV.splice(this.valueV.findIndex(t => t.id === e.params.data.id
        || t.text.toUpperCase() === e.params.data.toUpperCase()), 1);
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private selectOption() {
    const self = this;

    this.elementRf.find('option').each(function() {
      this.selected = false;
    });
    this.elementRf.find('option').filter(function() {
      const text = $(this).text();
      const val = $(this).val();
      const count = self.valueV != null
        ? self.valueV.filter( value => value.text && value.text.toUpperCase() === text.toUpperCase() || value.id === val)
        : [];

      return count.length > 0;
    }).each(function() {
      this.selected = true;
    });
  }
}
