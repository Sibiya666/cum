import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent {
  @Input()
  label: string;

  @ViewChild('InputElement')
  input: ElementRef;

  @Input()
  require = false;

  @Input()
  isError = false;

  @Input()
  value: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(value: any) {}

  onTouched() {}

  writeValue(value: any) {
    this.input.nativeElement.value = value;
  }

  changeValue(event: any) {
    this.onChange(event.target.value);
    this.onTouched();
  }
}
