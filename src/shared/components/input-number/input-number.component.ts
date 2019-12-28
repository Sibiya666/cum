import { Component, forwardRef, ViewChild, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KEY_CODE } from './model';


@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ],
})
export class InputNumberComponent implements ControlValueAccessor {

  changeNumber(event: KeyboardEvent) {
    switch (true) {
      case KEY_CODE.PLUS === event.which || KEY_CODE.PLUS_ON_PAD === event.which:
        this.value = Number(this.value) + 1;
        break;
      case KEY_CODE.MINUS === event.which || KEY_CODE.MINUS_ON_PAD === event.which:
        if (this.value === 0) {
          return
        }
        this.value = Number(this.value) - 1;
        break;
    }

    this.inputNumber.nativeElement.value = this.value;
    this.changeValue(this.value);
  }

  @ViewChild('InputNumber')
  inputNumber: ElementRef;

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
    this.inputNumber.nativeElement.value = value;

  }

  changeValue(event: any) {
    if (!event.target || !event.target.value) {
      return
    }

    this.value = event.target.value;
    this.onChange(event.target.value);
    this.onTouched();
  }

}
