import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../../model/job'; 
import { JobService } from '../job.service';


@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})

export class JobListComponent implements OnInit {
    public jobs: Job[] = [];
    
    constructor( private router: Router, private jobService: JobService ) { }
    
    ngOnInit() {
        this.loadJobList(); 
    }
   
    loadJobList() {
        this.jobService.getJobList().then((data)=>{   
          console.log('get job data', data);
          this.jobs = data['data'];
        }).catch((error)=>{
          console.log("loadJobList " + JSON.stringify(error));
        });
      }
    
    createJob() {
        this.router.navigate(['job/detail']);
    }
    editJobDetail(id) {
        this.router.navigate(['job/detail/' + id]);
    }
    
    deleteJob(id) {        
        if (confirm('Are you sure you want to delete job into the database?')) {
            this.jobService.removeJob(id).then((data)=>{            
                for (var i in this.jobs) {
                    if (this.jobs[i].id === id) {
                        this.jobs.splice(+i, 1);  
                    }
                }  
              
            }).catch((error)=>{
              console.log("deleteJob " + JSON.stringify(error));
            });
        } else {
            
        }
    }

}
