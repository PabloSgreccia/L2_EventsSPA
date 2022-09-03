import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
// Interfaces
import { UserServiceService } from '@etp/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL_API_USER = "http://localhost:3000/api/user"

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService,
    ) { }

  // New User
  signUp(name: string, email: string, password: string){
    const body = {
      name, 
      email, 
      password
    }
    return this.http.post<any>(`${this.URL_API_USER}/register`, body)
  }
  
  // user log in
  logIn(email: string, password: string){
    const body = {
      email,
      password
    }
    return this.http.post<any>(`${this.URL_API_USER}/login`, body)
  }
  
  // check if token exists in localsorage
  loggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  // returns token
  getToken() {
    return localStorage.getItem('token');
  }
  
  // TODO: avisar a adelmar que cree un metodo en el BE
  // Get information about logged user
  getLoggedUser(){
    return this.http.get<any>(`${this.URL_API_USER}/logged`)
  }

  // Return true if logged user is admin
  isAdmin(): boolean {
    let token = localStorage.getItem('token') 
    if (token) {
      let decoded: {id: string, role: string, iat:number } = jwt_decode(token);
      return decoded.role === 'admin' ? true : false;
    } else {
      return false
    }

  }

  // logout
  logOut(){
    this.userService.resetUser();
    localStorage.removeItem('token');
    this.router.navigate(['/signmenu'])
  }

}
