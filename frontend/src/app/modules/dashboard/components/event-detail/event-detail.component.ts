import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventServiceService } from '@etp/shared/services';
import { Event, User } from "@etp/shared/interfaces";

@Component({
  selector: 'etp-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event: Event = 
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
  }

  user: User = {
    _id:24,
  }
  
  today = new Date

  userEvents = [
    {
      name: 'Juan Carlos',
      star: false
    },
    {
      name: 'Julian Benitez',
      star: false
    },
    {
      name: 'Lebron James',
      star: true
    },
    {
      name: 'Luis Felipe',
      star: false
    },
    {
      name: 'Adrián Romano',
      star: false
    },
    {
      name: 'Federico Newman',
      star: false
    },
    {
      name: 'Alejandra Ramirez',
      star: false
    },
  ]

  message:string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventServiceService
  ) { }

  ngOnInit(): void{
    this.event = this.eventService.getEvent() 
    
    this.userEvents.sort(
      function(a, b) {          
         if (a.star === b.star) {
            return ((a.name || 0) < (b.name || 0)) ? 1 : -1;
         }
         return a.star < b.star ? 1 : -1;
      });
  }

  
  joinEvent(id:number | undefined){
    this.event.people = (this.event.people || 0) + 1  
    this.event.participateDisabled = true
  }
}
