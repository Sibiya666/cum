import { Component, forwardRef, ViewChild, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from './model';
import { trigger, style, state, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  animations: [
    trigger('changeVisible', [
      state('*', style({
        opacity: 1,
      })),
      state('void', style({
        opacity: .1,
      })),
      transition('void <=> *', [
        animate('.3s ease-out')
      ]),
    ]),
  ],
})
export class InputComponent implements ControlValueAccessor {

  @ViewChild('InputElement')
  input: ElementRef;

  @ViewChild('Textarea')
  textarea: ElementRef;

  @Input()
  label: string;

  @Input()
  type: InputType = 'text';

  @Input()
  require = false;

  @Input()
  isError = false;

  @Input()
  errorMsg: string;
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

    if (this.input) {
      this.input.nativeElement.value = value;
      return;
    }

    if (this.textarea) {
      this.textarea.nativeElement.value = value;
      return;
    }
  }

  changeValue(event: any) {
    this.onChange(event.target.value);
    this.onTouched();
  }

}
