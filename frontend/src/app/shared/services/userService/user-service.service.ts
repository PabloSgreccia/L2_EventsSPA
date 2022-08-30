import { Injectable } from '@angular/core';
import { User } from '@etp/shared/interfaces';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(){}

  getUserData(token:any): User{
    return jwt_decode(token);
  }

  // storeUserData(user: User){
  //   //this.user = user
  // }

}
