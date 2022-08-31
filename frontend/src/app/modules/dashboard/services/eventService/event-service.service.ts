import { Injectable } from '@angular/core';
import { Event } from "@etp/dashboard/interfaces";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  

  private event:Event = {
    _id: 0,
    title: '',
    init_date: new Date(),
    end_date: new Date(),
    cancelled: false,
    type: '',
    finished: false,
    adminUser: '',
  }
  // currentEvent = this.event.asObservable();

  constructor(
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

}
