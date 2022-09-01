import { Component, OnInit } from '@angular/core';
import { Event } from '@etp/dashboard/interfaces';

@Component({
  selector: 'etp-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventsList!: Event[]

  constructor() { }

  ngOnInit(): void {
  }

}
