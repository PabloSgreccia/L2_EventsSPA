import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
// Interfaces
import { User } from '@etp/shared/interfaces';
import { Event } from '@etp/dashboard/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  URL_API_USER = "http://localhost:3000/api/user"

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

  constructor(
    private http: HttpClient,
  ){}

  // Observable
  getUser():Observable<User> {
    return this._user$.asObservable()
  }

  updateUser(user:User):void {
    this._user$.next(user)
  }

  resetUser() {
    this._user$.next(this.initialState)
  }
  // Observable

  getOneUser(userId: number){
    return this.http.get<any>(`${this.URL_API_USER}/${userId}`)
  }

  desactivateUser(userId: number){
    return this.http.patch<any>(`${this.URL_API_USER}/`, userId)
  }

  editUserData(name: string){
    return this.http.patch<any>(`${this.URL_API_USER}/`, name)
  }

  editUserPrivacity(privacy: string){
    return this.http.patch<any>(`${this.URL_API_USER}/`, privacy)
  }

  updateVerifyStatus(validated: number){
    return this.http.patch<any>(`${this.URL_API_USER}/`, validated)
  }

  editUserPwd(oldPassword: string, newPassword: string){
    const body = {
      oldPassword,
      newPassword
    }
    return this.http.patch<any>(`${this.URL_API_USER}/`, body)
  }

  editUserPhoto(fileToUpload: File | null){
    if (fileToUpload) {
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
    }
    return this.http.patch<any>(`${this.URL_API_USER}/`, fileToUpload)
  }

  getEventsCreatedByUser(idUser: number){
    return this.http.get<any>(`${this.URL_API_USER}/${idUser}`)
  }

  getEventsFollowedByUser(idUser: number){
    return this.http.get<any>(`${this.URL_API_USER}/${idUser}`)
  }

  getUsersByName(name: string){
    return this.http.get<any>(`${this.URL_API_USER}/${name}`)
  }


  userJoinsEvent(idUser: number, idEvent: number){
    const body = {
      idUser,
      idEvent
    }
    return this.http.patch<any>(`${this.URL_API_USER}/`, body)
  }

  userLeftEvent(idUser: number, idEvent: number, favourite: boolean){
    const body = {
      idUser,
      idEvent,
    }
    return this.http.delete<any>(`${this.URL_API_USER}/${idUser}/${idEvent}`)
  }

  userFavedForEvent(idUser: number, idEvent: number, favourite: boolean){
    const body = {
      idUser,
      idEvent,
      favourite
    }
    return this.http.patch<any>(`${this.URL_API_USER}/`, body)
  }

}
