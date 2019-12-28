import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subscription } from 'rxjs';
import { UserResume } from 'src/models/userForm';
import { MATRIAL_TYPE, GENDER } from 'src/models/model';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss']
})
export class ResumeViewComponent implements OnInit, OnDestroy {
  resume$: Observable<UserResume> = this.appService.getDataOfUserResume;
  MARITAL_TYPE = MATRIAL_TYPE;
  GENDER = GENDER;
  sbs$: Subscription[] = [];
  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sbs$.push(
      this.appService.getDataOfUserResume
        .pipe(
          filter(value => !value),
          tap(() => this.router.navigate(['']))
        ).subscribe()
    )
  }

  ngOnDestroy() {
    this.sbs$.forEach(sbs => sbs.unsubscribe());
  }

  getMaritalType(sexField: { [key: string] : string}[], status: string): string {
    return sexField.find(field => field.value === status).label
  }
}
