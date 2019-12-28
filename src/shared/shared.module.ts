import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { OnlyRuDirective } from './directives/only-ru.directive';
import { RadioButtonComponent } from './components/radio-button';
import { DatepickerComponent } from './components/datepicker';
import { DropdownComponent } from './components/dropdown';
import { InputNumberComponent } from './components/input-number';

const component = [
  DatepickerComponent,
  DropdownComponent,
  InputComponent,
  InputNumberComponent,
  RadioButtonComponent
];

const directives = [OnlyRuDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...component, ...directives],
  exports: [...component, ...directives]
})
export class SharedModule { }
