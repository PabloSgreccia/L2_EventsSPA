import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from "@etp/dashboard/interfaces";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  URL_API_EVENT = "http://localhost:3000/api/event"
  
  private initialState: Event = 
  {
    id: 0,
    title: '',
    description: '',
    mode: '',
    province: '',
    city: '',
    street: '',
    number: 0,
    init_date: new Date(),
    end_date: new Date(),
    cancelled: false,
    idType: 0,
    photo: '',
    finished: false,
    adminUser: '',
    people: 0,
    verifiedadmin: false, 
    adminPhoto: '',
    idUser: 1,
  }
  private _event$ = new BehaviorSubject(this.initialState)

  constructor(
    private http: HttpClient,
    ) { }
    

  // Observable
  getEvent():Observable<Event> {
    return this._event$.asObservable()
  }

  setEvent(event:Event):void {
    this._event$.next(event)
  }

  resetEvent() {
    this._event$.next(this.initialState)
  }
  // Observable

  
  // usuario crea un evneto
  createEvent(event:any, photo?: File){
    const formdata = new FormData()
    if (photo) {
      formdata.append('photo', photo)
    }
    formdata.append('payload', JSON.stringify(event))

    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    // JSON.parse(payload) --> BE
    
    return this.http.post<any>(`${this.URL_API_EVENT}/create`, formdata)
  }

  // el admin de un evento, actualiza un evento
  updateEvent(event: any, photo?: File){
    const formdata = new FormData()
    if (photo) {
      formdata.append('photo', photo)
    }
    formdata.append('payload', JSON.stringify(event))
    // JSON.parse(payload) --> BE
    return this.http.patch<any>(`${this.URL_API_EVENT}/create`, formdata)
  }

  // el admin del evento, cancela un evento
  cancelEvent(id: number, cancelled = true){
    const body = {
      id, 
      cancelled
    }
    return this.http.patch<any>(`${this.URL_API_EVENT}/update`, body)
  }

  // el admin del evento o el admin general, elimina un evento
  deleteEvent(id: number){
    return this.http.delete<any>(`${this.URL_API_EVENT}/delete/${id}`)
  }

  // obtener datos de un evento - lo usamos para algo?
  // getOneEvent(id: number){
  //   return this.http.get<any>(`${this.URL_API_EVENT}/${id}`)
  // }
  
  // obtener listado de eventos (feed)
  getManyEvent(){
    return this.http.get<any>(`${this.URL_API_EVENT}/views`)
  }

  // obtener listado de usuarios deun evento
  getUsersByEvent(idEvent: number){
    return this.http.get<any>(`${this.URL_API_EVENT}/${idEvent}`)
  }

}
