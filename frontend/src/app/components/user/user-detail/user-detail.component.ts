import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public userId: string;
  public userDetail = <User>{};
  public mode: string;
  public userForm: FormGroup;
  public submitted = false;
      
  constructor( private activatedRoute: ActivatedRoute, private router: Router, 
    private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    
    this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        status: ['', Validators.required],
        hourlyRate: ['', Validators.required]
    });
    
    
    this.activatedRoute.params.subscribe((params: Params) => {
          this.userId = params['id'];
          if (this.userId !== undefined) {
                console.log(this.userId);
                this.mode = 'Edit'; 
                this.loadUserDetail(this.userId);   
          } else {
                // this.todoId = null;
                console.log(this.userId);
                this.mode = 'Add';   
          }
        });
         
  }
  
  loadUserDetail(userId) {
    this.userService.retrieveUser(userId).then((data)=>{   
      this.userForm.patchValue({
          name: data['name'],
          dateOfBirth: data['dateOfBirth'],
          email: data['email'],
          status: data['status'],
          hourlyRate: data['hourlyRate']
        });
    }).catch((error)=>{
      console.log("loadUserDetail " + JSON.stringify(error));
    });
  }
  
  
  get f() { return this.userForm.controls; }
  
  onSubmit() {
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }
        
        if(this.userId) {            
            this.userService.updateUser(this.userId, this.userForm.value).then((data)=>{            
                this.router.navigate(['user/list']);
            }).catch((error)=>{
              console.log("Update User " + JSON.stringify(error));
            });
        } else {
            this.userService.createUser(this.userForm.value).then((data)=>{            
                this.router.navigate(['user/list']);
            }).catch((error)=>{
              console.log("Add User " + JSON.stringify(error));
            });
        }
    }
    
    onClickCancel() {
        this.router.navigate(['user/list']);
    }

}
