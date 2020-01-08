import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../../model/job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  public jobId: string;
  public jobDetail = <Job>{};
  public mode: string;
  public jobForm: FormGroup;
  public submitted = false;
      
  constructor( private activatedRoute: ActivatedRoute, private router: Router, 
    private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit() {
    
    this.jobForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
    });
    
    
    this.activatedRoute.params.subscribe((params: Params) => {
          this.jobId = params['id'];
          if (this.jobId !== undefined) {
                console.log(this.jobId);
                this.mode = 'Edit'; 
                this.loadJobDetail(this.jobId);   
          } else {
                // this.todoId = null;
                console.log(this.jobId);
                this.mode = 'Add';   
          }
        });
         
  }
  
  loadJobDetail(jobId) {
    this.jobService.retrieveJob(jobId).then((data)=>{   
      this.jobForm.patchValue({
          title: data['title'],
          description: data['description']
        });
    }).catch((error)=>{
      console.log("loadJobDetail " + JSON.stringify(error));
    });
  }
  
  
  get f() { return this.jobForm.controls; }
  
  onSubmit() {
        this.submitted = true;       
        if (this.jobForm.invalid) {
            return;
        }
        
        if(this.jobId) {       
            this.jobService.updateJob(this.jobId, this.jobForm.value).then((data)=>{            
                this.router.navigate(['job/list']);
            }).catch((error)=>{
              console.log("Update Job " + JSON.stringify(error));
            });
        } else {
            this.jobService.createJob(this.jobForm.value).then((data)=>{            
                this.router.navigate(['job/list']);
            }).catch((error)=>{
              console.log("Add Job " + JSON.stringify(error));
            });
        }
    }
    
    onClickCancel() {
        this.router.navigate(['job/list']);
    }

}
