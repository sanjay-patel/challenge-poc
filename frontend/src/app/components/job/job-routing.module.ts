import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './job.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';


@NgModule({
  imports: [
    RouterModule.forChild([
        { path: '', component: JobComponent,
            children: [
               {path: '', redirectTo: 'list'},
               {path: 'list', component: JobListComponent},
               {path: 'detail', component: JobDetailComponent},
               {path: 'detail/:id', component: JobDetailComponent}
            ]
        }
    ])
  ]
})

export class JobRoutingModule { }
