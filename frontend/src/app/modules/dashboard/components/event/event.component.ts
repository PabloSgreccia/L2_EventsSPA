import { Component, Input, OnInit } from '@angular/core';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'

@Component({
  selector: 'etp-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event!: Event;
  today = new Date();

  idUser!: number
  
  constructor( ) { }

  ngOnInit(): void {
    this.event.init_date = new Date(this.event.init_date)
    this.event.end_date = new Date(this.event.end_date)
  }

  redirectTo(link: string){
    window.open(`http:${link}`, "_blank")
  }

}
