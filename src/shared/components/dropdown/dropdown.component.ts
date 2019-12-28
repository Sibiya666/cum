import { Component, OnInit, Input, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownItem } from 'src/models/model';


import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
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
  host: {
    '(window:click)': 'clickListener($event)'
  }
})
export class DropdownComponent {


  @Input()
  list: DropdownItem<any>[];


  @Input()
  label: string;

  @Input()
  require = false;

  @Input()
  isError = false;

  @Input()
  errorMsg: string;

  @ViewChild('DropdownList')
  dropdownListElement: ElementRef;

  value: any;
  isVisibleList = false;



  constructor(private element: ElementRef) { }

  clickListener(event) {
    if (!this.dropdownListElement) {
      return
    }

    this.isVisibleList = this.dropdownListElement.nativeElement.contains(event.target)
      ? !this.isVisibleList
      : true;
  }

  findCurrentLabel() {
    if (!this.list) {
      return
    }

    return this.list.find(item => item.value === this.value)
  }

  changeVisible() {
    this.isVisibleList = !this.isVisibleList;
  }

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
  }

  changeValue(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

}
