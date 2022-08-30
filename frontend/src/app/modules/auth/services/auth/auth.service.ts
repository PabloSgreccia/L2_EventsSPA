import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
// Interfaces
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL_API_USER = "http://localhost:3000/api/user"

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService
    ) { }

  signUp(user: User){
    return this.http.post<any>(`${this.URL_API_USER}/signup`, user)
  }
  
  logIn(email: string, password: string){
    const body = {
      email,
      password
    }
    return this.http.post<any>(`${this.URL_API_USER}/signin`, body)
  }
  
  loggedIn(): Boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signmenu'])
  }

  // isAdmin(){
  //   if (this.loggedIn()) {
  //     const token = this.getToken() || ''
  //     const role = this.getDecodedAccessToken(token).role
      
  //     // let role = this.userService.getUser().role
  //     if (role === 'admin') {
  //       console.log("ES ADMIN");
  //       return true
  //     } else {
  //       console.log("NOOOOOOOOOOO DONDE VAS");
  //       return false
  //     }
  //   } else {
  //     return false
  //   }
  // }

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     // return jwt_decode(token);
  //     console.log(jwt_decode(token));
  //     return jwt_decode(token);
  //   } catch(Error) {
  //     // return null;
  //     console.log(Error);
  //     return null;
  //   }
  // }

}
