import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
// Interfaces
import { User } from '@etp/shared/interfaces';
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

  signUp(name: string, email: string, password: string){
    const body = {
      name, 
      email, 
      password
    }
    return this.http.post<any>(`${this.URL_API_USER}/register`, body)
  }
  
  logIn(email: string, password: string){
    const body = {
      email,
      password
    }
    return this.http.post<any>(`${this.URL_API_USER}/login`, body)
  }
  
  loggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  getLoggedUser(){
    return this.http.get<any>(`${this.URL_API_USER}/`)
  }

  isAdmin(): boolean {
    let token = localStorage.getItem('token') 
    if (token) {
      let decoded: {_id: string, role: string, iat:number } = jwt_decode(token);
      console.log(decoded.role);
      
      //TODO: cambiar cuando se oficialice
      return decoded.role === 'user' ? true : false;
    } else {
      return false
    }

  }

  logOut(){
    this.userService.resetUser();
    localStorage.removeItem('token');
    this.router.navigate(['/signmenu'])
  }

}
