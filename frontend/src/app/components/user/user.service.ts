import { Injectable, OnInit } from '@angular/core';
import { FeathersService } from '../../shared/feathers.service';

import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userService;
  constructor(
    private feathers: FeathersService
  ) {
    this.userService = this.feathers.createService<User>('user');
  }

  
 async getUserList() {
    const userList = await this.userService.find();
    return userList;
    console.log('User List:', userList);
 }  
  
 async createUser(data) {
    const createdUser = await this.userService.create(data);
    console.log('Created User:', createdUser);
    return createdUser;
 }
 
  async updateUser(id, data) {
    const updatedUser = await this.userService.update(id, data);
    console.log('Update User:', updatedUser);
 }  
 
 async retrieveUser(id) {
    const retrievedUser = await this.userService.get(id);
    return retrievedUser;
    console.log('Retrieved User:', retrievedUser);
 } 
 
 async removeUser(id) {
    const removedUser = await this.userService.remove(id);
    return removedUser.id;
    console.log('removed User with id:', removedUser.id);
 } 

}
