import { Component, forwardRef, ViewChild, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
  @ViewChild('InputElement')
  input: ElementRef;


  @Input()
  label: string;


  @Input()
  require = false;

  @Input()
  isError = false;
  value: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  onChange(value: any) {
  }

  onTouched() {
  }

  writeValue(value: any) {
    this.value = value;
    this.input.nativeElement.value = value;
  }

  changeValue(event: any) {
    this.onChange(event.target.value);
    this.onTouched();
  }

}
