import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  imports: [
    RouterModule.forChild([
        { path: '', component: UserComponent,
            children: [
               {path: '', redirectTo: 'list'},
               {path: 'list', component: UserListComponent},
               {path: 'detail', component: UserDetailComponent},
               {path: 'detail/:id', component: UserDetailComponent}
            ]
        }
    ])
  ]
})

export class UserRoutingModule { }
