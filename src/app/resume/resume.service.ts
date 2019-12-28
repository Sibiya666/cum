import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { emailUnicode } from 'src/validators/email';

@Injectable()
export class ResumeService {
  createForm() {
    return {
      surname: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      firstname: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      middlename: new FormControl('', [Validators.maxLength(15)]),
      gender: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      children: new FormControl(0),
      email: new FormControl('', [Validators.required, emailUnicode]),
      comment: new FormControl('', [Validators.maxLength(1000)])
    };
  }
}
