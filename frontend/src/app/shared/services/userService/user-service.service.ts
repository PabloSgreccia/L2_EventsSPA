import { Injectable } from '@angular/core';
import { User } from '@etp/shared/interfaces';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private initialState: User = 
    {
      _id: 0, 
      name: '', 
      email: '', 
      role: '', 
      validated: 1, 
      photo: '',
    }
  private _user$ = new BehaviorSubject(this.initialState)

  private user = 
    {
      _id: 0, 
      name: '', 
      email: '', 
      role: '', 
      validated: 1, 
      photo: '',
    }

  constructor(
  ){}

  getUser():Observable<User> {
    return this._user$.asObservable()
  }

  updateUser(user:User):void {
    this._user$.next(user)
  }

  resetUser() {
    this._user$.next(this.initialState)
  }

  storeUserData(user: any){    
    // Create cookie
    document.cookie = `user=${JSON.stringify(user)}`;
  }

  getUserData(): User {    
    // Get cookie
    let cookieValue = '';

    let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `user=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                cookieValue = c.substring(cookieName.length, c.length);
            }
        }

    if (cookieValue) {
      let usuario = JSON.parse(cookieValue)
      return (usuario);
    }
    return this.user
  }

}
