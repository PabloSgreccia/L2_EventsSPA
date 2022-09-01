import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from "@etp/dashboard/interfaces";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  URL_API_EVENT = "http://localhost:3000/api/event"
  

  private event!:Event 
  // currentEvent = this.event.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  
  setEvent(event: any){
    document.cookie = `event=${JSON.stringify(event)}`;    
  }

  getEvent(): Event {    
    // Get cookie
    let cookieValue = '';

    let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `event=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                cookieValue = c.substring(cookieName.length, c.length);
            }
        }

    if (cookieValue) {
      let evento = JSON.parse(cookieValue)
      return (evento);
    }
    return this.event
  }
  
  createEvent(event:any, fileToUpload: File | null){
    if (fileToUpload) {
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
    }
    let body = {
      event,
      fileToUpload
    }
    return this.http.post<any>(`${this.URL_API_EVENT}/editdata`, body)
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


  updateEvent(event: any, fileToUpload: File | null){
    if (fileToUpload) {
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
    }
    let body = {
      event,
      fileToUpload
    }
    return this.http.patch<any>(`${this.URL_API_EVENT}/`, body)
  }

  cancelEvent(eventId: number, cancelled = true){
    const body = {
      eventId, cancelled
    }
    return this.http.patch<any>(`${this.URL_API_EVENT}/`, body)
  }

  deleteEvent(eventId: number){
    return this.http.delete<any>(`${this.URL_API_EVENT}/${eventId}`)
  }

  getOneEvent(eventId: number){
    return this.http.get<any>(`${this.URL_API_EVENT}/${eventId}`)
  }
  
  getManyEvent(){
    return this.http.get<any>(`${this.URL_API_EVENT}/`)
  }

  getUsersByEvent(idEvent: number){
    return this.http.get<any>(`${this.URL_API_EVENT}/${idEvent}`)
  }

}
