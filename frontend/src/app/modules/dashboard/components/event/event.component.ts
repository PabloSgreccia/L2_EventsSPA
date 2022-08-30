import { Component, Input, OnInit } from '@angular/core';
import { Event } from '@etp/shared/interfaces'

@Component({
  selector: 'etp-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event!: Event;
  today = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  showEvent(id:number | undefined){
    console.log(id);
  }

  joinEvent(id:number | undefined){
      this.event.people = (this.event.people || 0) + 1  
      this.event.participateDisabled = true
    }
    

}
