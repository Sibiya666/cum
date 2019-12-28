import {AbstractControl, ValidatorFn} from '@angular/forms';

export const emailUnicode: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  return /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()\[\].,;:\s@"!#$%&'*+\\/=?^_`{|}~]+\.)+[^<>()\[\].,;:\s@"!#$%&'*+\\/=?^_`{|}~]{2,})$/i.test(control.value) ? null : {'emailUnicode': true};
};
