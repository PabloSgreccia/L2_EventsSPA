import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
// Interfaces
import { User } from '@etp/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  
  URL_API_USER = "http://localhost:3000/api/user"

  constructor(
    private http: HttpClient,
    private router: Router
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
    this.router.navigate(['/signin'])
  }


}
