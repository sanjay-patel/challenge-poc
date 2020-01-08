import { Injectable, OnInit } from '@angular/core';
import { FeathersService } from '../../shared/feathers.service';

import { Job } from '../../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  jobService;
  constructor(
    private feathers: FeathersService
  ) {
    this.jobService = this.feathers.createService<Job>('job');
  }

  
 async getJobList() {
    const jobList = await this.jobService.find();
    return jobList;
    console.log('Job List:', jobList);
 }  
  
 async createJob(data) {
    const createdJob = await this.jobService.create(data);
    console.log('Created Job:', createdJob);
    return createdJob;
 }
 
  async updateJob(id, data) {
    const updatedJob = await this.jobService.update(id, data);
    console.log('Update Job:', updatedJob);
 }  
 
 async retrieveJob(id) {
    const retrievedJob = await this.jobService.get(id);
    return retrievedJob;
    console.log('Retrieved Job:', retrievedJob);
 } 
 
 async removeJob(id) {
    const removedJob = await this.jobService.remove(id);
    return removedJob.id;
    console.log('removed job with id:', removedJob.id);
 } 

}
