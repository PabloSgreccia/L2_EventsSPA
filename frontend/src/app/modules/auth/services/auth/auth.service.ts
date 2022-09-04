import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
// Interfaces
import { UserServiceService } from '@etp/shared/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // URL_API_USER = "http://localhost:3000/api/user"
  URL_API_USER = `${environment.HOST}/api/user`

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService,
    ) { }

  // New User
  signUp(name: string, email: string, password: string){
    email = email.toLowerCase()
    const body = {
      name, 
      email, 
      password
    }
    return this.http.post<any>(`${this.URL_API_USER}/register`, body)
  }
  
  // user log in
  logIn(email: string, password: string){
    email = email.toLowerCase()
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
