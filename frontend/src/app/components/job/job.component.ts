import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html'
})

export class JobComponent implements OnInit {
   
    constructor( private router: Router ) { }
    
    ngOnInit() {
     
    }
}
