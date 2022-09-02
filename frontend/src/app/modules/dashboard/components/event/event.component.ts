import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Interfaces
import { User } from '@etp/shared/interfaces'
import { Event } from '@etp/dashboard/interfaces'
// Services
import { EventServiceService } from '@etp/dashboard/services';

@Component({
  selector: 'etp-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event!: Event;
  today = new Date();

  idUser!: number
  
  constructor(
    private eventService: EventServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  showEvent(id:number | undefined){
    console.log(id);
  }

  joinEvent(id:number | undefined){
      this.event.people = (this.event.people || 0) + 1  
      this.event.participateDisabled = true
    }
    
  redirectEventDetails(event: Event){
    this.eventService.setEvent(event);
    this.router.navigate([`/dashboard/event/${this.event.id}`]);
  }
}
