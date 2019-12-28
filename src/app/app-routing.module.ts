
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './resume';
import { ResumeViewComponent } from './resume-view';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ResumeComponent
  },
  {
    path: 'view',
    pathMatch: 'full',
    component: ResumeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ResumeRoutingModule { }
