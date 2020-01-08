import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/user'; 
import { UserService } from '../user.service';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
    public users: User[] = [];
    
    constructor( private router: Router, private userService: UserService ) { }
    
    ngOnInit() {
        this.loadUserList(); 
    }
    
    
    loadUserList() {
        this.userService.getUserList().then((data)=>{   
          console.log('get user data', data);
          this.users = data['data'];
        }).catch((error)=>{
          console.log("loadUserDetail " + JSON.stringify(error));
        });
      }
    
    createUser() {
        this.router.navigate(['user/detail']);
    }
    editUserDetail(id) {
        this.router.navigate(['user/detail/' + id]);
    }
    
    deleteUser(id) {
        
        if (confirm('Are you sure you want to delete user into the database?')) {
            this.userService.removeUser(id).then((data)=>{            
                for (var i in this.users) {
                    if (this.users[i].id === id) {
                        this.users.splice(+i, 1);  
                    }
                }  
              
            }).catch((error)=>{
              console.log("deleteUser " + JSON.stringify(error));
            });
        } else {
            
        }
    }

}
