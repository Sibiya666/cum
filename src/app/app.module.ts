import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResumeComponent } from './resume';
import { ResumeRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumeService } from './resume/resume.service';
import { ResumeViewComponent } from './resume-view/resume-view.component';

@NgModule({
   declarations: [
      AppComponent,
      ResumeComponent,
      ResumeViewComponent
   ],
   imports: [
      BrowserAnimationsModule,
      BrowserModule,
      ReactiveFormsModule,
      ResumeRoutingModule,
      SharedModule
   ],
   providers: [
      ResumeService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
