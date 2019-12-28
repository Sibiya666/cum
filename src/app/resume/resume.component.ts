import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { ResumeService } from './resume.service';
import { Subscription, interval, fromEvent, Observable } from 'rxjs';
import { tap, scan, mapTo } from 'rxjs/operators';
import { ERROR_MSG, STEP_COUNT_SUBMIT_CLICK, MAX_COUNT_SUBMIT_CLICK, TIME_OF_DISABLED_SUBMIT, ADULT_EGE } from './model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MATRIAL_TYPE } from 'src/models/model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnDestroy, OnInit {
  @ViewChild('SubmitBtn')
  submitBtn: ElementRef;
  form = this.formBuilder.group(this.resumeService.createForm());
  sbs$: Subscription[] = [];
  isVisibleMaritalStatus: boolean;
  maritalType = MATRIAL_TYPE;
  errorMsg = ERROR_MSG;

  clicksOnSubmitBtn: Observable<Event>;
  disableSubmit: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private appService: AppService,
    private router: Router,
  ) { }

  getControl(name: string): AbstractControl {
    return this.form.controls[name];
  }

  isInvalid(controlName: string): boolean {
    const control = this.getControl(controlName);
    return control.invalid && control.touched;
  }

  ngOnInit() {
    this.clicksOnSubmitBtn = fromEvent(this.submitBtn.nativeElement, 'click');
    this.initSbsOnBirthday();
    this.iniSbsOnClicOnSubmit();

  }

  ngOnDestroy() {
    this.sbs$.forEach(sbs => sbs.unsubscribe());
  }

  iniSbsOnClicOnSubmit() {
    this.sbs$.push(
      this.clicksOnSubmitBtn
      .pipe(
        mapTo(STEP_COUNT_SUBMIT_CLICK),
        scan(acc => acc + STEP_COUNT_SUBMIT_CLICK, 0),
        tap(count => {

          if (count % MAX_COUNT_SUBMIT_CLICK === 0) {
            this.initValueForForm()
          }
        })
      )
      .subscribe()
    )

  }
  initSbsOnBirthday() {
    this.sbs$.push(
      this.getControl('birthday')
        .valueChanges
        .pipe(
          tap(date => this.changeFielForAdultuser(date))
        ).subscribe()
    )
  }

  save() {
    this.disableSubmit = true;
    this.markAsTouched();

    if (this.form.invalid) {
      interval(TIME_OF_DISABLED_SUBMIT).pipe(tap(() => this.disableSubmit = false)).subscribe();
      return
    }

    this.appService.setDataOfUserResume = this.form.getRawValue();
    this.router.navigate(['./view']);
  }

  private isAdultUser(value: string): boolean {
    return new Date(value).getFullYear() + ADULT_EGE <= new Date().getFullYear();
  }

  private changeFielForAdultuser(date: string) {
    this.isVisibleMaritalStatus = this.isAdultUser(date);
    const matrialStatus = this.getControl('matrialStatus');
    this.isVisibleMaritalStatus
      ? !matrialStatus && this.form.addControl('matrialStatus', new FormControl('', Validators.required))
      : matrialStatus && this.form.removeControl('matrialStatus');

    matrialStatus && this.form.updateValueAndValidity();
  }

  private markAsTouched() {
    Object.keys(this.form.controls).forEach((name: string) => {
      this.getControl(name).markAsTouched();
    });
  }

  private initValueForForm() {
    Object.keys(this.form.controls).forEach(
      name => {

        if (name === 'children') {
          this.getControl(name).setValue(0)
          this.form.updateValueAndValidity();
          return
        }

        this.getControl(name).setValue('');
        this.form.updateValueAndValidity();
      }
    )
  }
}
