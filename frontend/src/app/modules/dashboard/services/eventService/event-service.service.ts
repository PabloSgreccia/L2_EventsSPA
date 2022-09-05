import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from "@etp/dashboard/interfaces";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  // URL_API_EVENT = `${environment.HOST}/api/event`
  URL_API_EVENT = "http://eventoslasegunda.herokuapp.com/api/event"
  
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
    cantPeople: 0,
    user: {
      id:0,
      name:'',
      photo:'',
      validated:1,
    },

    type: {
        type:'',
        photo:'',
    }
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

  
  // Al entrar al detalle de un evento
  getEventById(idEvent: number){
    return this.http.get<any>(`${this.URL_API_EVENT}/view/${idEvent}`)
  }
  // usuario crea un evneto
  createEvent(event:any, photo?: File){
    event.init_date = event.init_date.toString()
    event.end_date = event.end_date.toString()
    const formdata = new FormData()
    // if (photo) {
    //   formdata.append('photo', photo)
    // }
    formdata.append('payload', JSON.stringify(event))

    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    // JSON.parse(payload) --> BE
    
    return this.http.post<any>(`${this.URL_API_EVENT}/create`, formdata)
  }

  // el admin de un evento, actualiza un evento
  updateEvent(event: any){
    event.init_date = event.init_date.toString()
    event.end_date = event.end_date.toString()
    return this.http.patch<any>(`${this.URL_API_EVENT}/update`, event)
  }

  updateEventPhoto(photo: File, eventId:number){
      const formdata = new FormData()
      formdata.append('photo', photo)
      return this.http.post<any>(`${this.URL_API_EVENT}/uploadphoto/${eventId}`, formdata)
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
  
  // obtener listado de eventos (feed)
  getManyEvent(){
    return this.http.get<any>(`${this.URL_API_EVENT}/views`)
  }

  // obtener listado de eventos (acotado para el admin)
  getManyEventAdmin(){
    return this.http.get<any>(`${this.URL_API_EVENT}/views/admin`)
  }

  // obtener listado de usuarios de un evento
  getUsersByEvent(idEvent: number){
    return this.http.get<any>(`${this.URL_API_EVENT}/userslist/${idEvent}`)
  }

  // cuando entras al perfil de un usuario, devolver los eventos que creó
  getEventsCreatedByUser(id: number){
    return this.http.get<any>(`${this.URL_API_EVENT}/eventscreatedbyuser/${id}`)
  }

  // cuando entras al perfil de un usuario, devolver los eventos que se anotó
  getEventsFollowedByUser(id: number){
    return this.http.get<any>(`${this.URL_API_EVENT}/eventsfollowedbyuser/${id}`)
  }
}
