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

  // private event!:Event 
  // setEvent(event: any){
  //   document.cookie = `event=${JSON.stringify(event)}`;    
  // }

  // getEvent(): Event {    
  //   // Get cookie
  //   let cookieValue = '';

  //   let ca: Array<string> = document.cookie.split(';');
  //       let caLen: number = ca.length;
  //       let cookieName = `event=`;
  //       let c: string;

  //       for (let i: number = 0; i < caLen; i += 1) {
  //           c = ca[i].replace(/^\s+/g, '');
  //           if (c.indexOf(cookieName) == 0) {
  //               cookieValue = c.substring(cookieName.length, c.length);
  //           }
  //       }

  //   if (cookieValue) {
  //     let evento = JSON.parse(cookieValue)
  //     return (evento);
  //   }
  //   return this.event
  // }
  
  // TODO: ver tema de la foto
  // usuario crea un evneto
  createEvent(event:any, fileToUpload: File | null){
    if (fileToUpload) {
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
    }
    let body = {
      event,
      fileToUpload
    }
    return this.http.post<any>(`${this.URL_API_EVENT}/create`, body)
  }

//   postFile(fileToUpload: File): Observable<boolean> {
//     const endpoint = 'your-destination-url';
//     const formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     return this.httpClient
//       .post(endpoint, formData, { headers: yourHeadersConfig })
//       .map(() => { return true; })
//       .catch((e) => this.handleError(e));
// }


  // el admin de un evento, actualiza un evento
  updateEvent(event: any, fileToUpload: File | null){
    if (fileToUpload) {
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
    }
    let body = {
      event,
      fileToUpload
    }
    return this.http.patch<any>(`${this.URL_API_EVENT}/update`, body)
  }

  // TODO: pasar evento { id, cancelled }
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
