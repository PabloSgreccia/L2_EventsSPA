import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
import { User } from "@etp/shared/interfaces";
// Services
import { EventServiceService } from '@etp/dashboard/services';

@Component({
  selector: 'etp-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event!: Event

  idUser!:number
  
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
