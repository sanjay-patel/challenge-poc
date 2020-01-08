import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobService } from './job.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        JobRoutingModule
    ],
    declarations: [JobComponent, JobListComponent, JobDetailComponent],
    providers: [JobService]
})

export class JobModule { }
