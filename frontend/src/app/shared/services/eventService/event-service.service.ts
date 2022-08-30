import { Injectable } from '@angular/core';
import { FeedComponent } from '@etp/dashboard/views';
import { Event } from "@etp/shared/interfaces";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  // private approvalStageMessage = new BehaviorSubject('Basic Approval is required!');

  private event = new BehaviorSubject(
  {
    _id: 0,
    title: '',
    province: '',
    city: '',
    street: '',
    number: 0,
    init_date: new Date(2022, 9, 2, 23, 0, 0),
    end_date: new Date(2022, 10, 10, 7, 0, 0),
    cancelled: false,
    type: '',
    photo: '',
    finished: false,
    adminUser: '',
    adminUserId: 0,
    people: 0,
    verifiedadmin: true, 
    adminPhoto: '',
    participateDisabled:false,
  })
  currentApprovalStageMessage = this.event.asObservable();

  constructor(
    // private feedComponent: FeedComponent
  ) { }

  getEvent(){
    var retrievedObject = localStorage.getItem('event');
    if (retrievedObject) {
      return JSON.parse(retrievedObject)
    }
    else return this.event
  }
  
  setEvent(event: any){
    this.event.next(event); 
    localStorage.setItem('event',JSON.stringify(event));       
  }

}
