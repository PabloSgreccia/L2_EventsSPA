import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
// Interfaces
import { User } from '@etp/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // URL_API_USER = "https://eventoslasegunda.herokuapp.com/api/user"
  URL_API_USER = `${environment.HOST}/api/user`

  private initialState: User = 
    {
      id: 0, 
      name: '', 
      email: '', 
      role: 'user', 
      validated: 1, 
      photo: '',
    }
  private _user$ = new BehaviorSubject(this.initialState)

  constructor(
    private http: HttpClient,
  ){}

  // Observable
  // Observable
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
  // Observable
  // Observable

  // traer datos de un usuario (ej: cuando visitas el perfil), o cuando se logea un usuario
  getOneUser(id: number){
    return this.http.get<any>(`${this.URL_API_USER}/view/${id}`)
  }
  // traer datos de todos los usuarios (acotados para el admin)
  getManyUsers(){
    return this.http.get<any>(`${this.URL_API_USER}/views`)
  }

  // Admin ve todas las verificaciones de usuario pendiente
  getVerificationPendingsUsers(){
    return this.http.get<any>(`${this.URL_API_USER}/validations`)
  }

  // un usuario quiere eliminar su cuenta
  desactivateUser(active: boolean){
    return this.http.patch<any>(`${this.URL_API_USER}/down`, {active})
  }
  
  // el adimin elimina un usuario
  deleteUser(id: number){
    const active = false
    return this.http.patch<any>(`${this.URL_API_USER}/delete/${id}`, {active})
  }

  // editar datos de usuario
  editUserData(name: string){
    return this.http.patch<any>(`${this.URL_API_USER}/updateuser`, {name})
  }

  // usuario solicita verificacion de usuario
  updateVerifyStatusUser(validated: number){
    return this.http.patch<any>(`${this.URL_API_USER}/updateuser`, {validated})
  }
  
  // Admin cambia verificacion de usuario
  updateVerifyStatus(idUser:number, validated: number){
    const body = {
      idUser,
      validated
    }
    return this.http.patch<any>(`${this.URL_API_USER}/updateuserverify`, body)
  }

  // usuario cambia su contrase??a
  editUserPwd(oldPassword: string, newPassword: string){
    const body = {
      oldPassword,
      newPassword
    }
    return this.http.patch<any>(`${this.URL_API_USER}/updatepass`, body)
  }

  // usuario cambia su foto
  editUserPhoto(photo: File){
    const formdata = new FormData()
    formdata.append('photo', photo)
    return this.http.post<any>(`${this.URL_API_USER}/uploadphoto`, formdata)
  }

  // usuario se anota a un evento
  userJoinsEvent(idEvent: number){
    return this.http.post<any>(`${this.URL_API_USER}/userjoinevent`, {idEvent})
  }

  // usuario se va a un evento
  userLeftEvent(idEvent: number){
    return this.http.delete<any>(`${this.URL_API_USER}/userleftevent/${idEvent}`)
  }

  // Admin del evento favea a un usuario de su evento
  userFavedForEvent(idUser: number, idEvent: number, favourite: boolean){
    const body = {
      idUser,
      idEvent,
      favourite
    }
    return this.http.patch<any>(`${this.URL_API_USER}/favourite`, body)
  }

  // Usuario olvido contrase??a
  forgotPassword(email: string){
    return this.http.post<any>(`${this.URL_API_USER}/forgot`, {email})
  }

}

