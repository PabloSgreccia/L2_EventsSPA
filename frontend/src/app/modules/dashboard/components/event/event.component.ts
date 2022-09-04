import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Interfaces
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

}
