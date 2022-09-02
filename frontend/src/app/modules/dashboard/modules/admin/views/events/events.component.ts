import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event } from '@etp/dashboard/interfaces';
import { EventServiceService, TypeServiceService } from '@etp/dashboard/services';


interface EventInterface {
  id: number;
  title: string;
}

@Component({
  selector: 'etp-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  initEventsList!: EventInterface[]
  filteredEventsList!: EventInterface[]

  @ViewChild("filterByEvent") filterByEvent: ElementRef | undefined;
  
  constructor(
    private typesService: TypeServiceService,
    private eventService: EventServiceService
  ) { }

  ngOnInit(): void {
    this.typesService.getTypes()
    .subscribe({
      next: event => {
        this.initEventsList = event
        this.initEventsList.sort(
          function(a, b) {                 
            return b.id > a.id? 1 : -1;
          });
        this.filteredEventsList = event
      },
      error: (err) => {}
    })
  }

  deleteEvent(id:number){
    this.eventService.deleteEvent(id)
  }

  // Filter by user
  async onKeyUp(){
    if (this.filterByEvent?.nativeElement.value.length >=1) {
      this.filteredEventsList = this.initEventsList
        .filter(event => {
          (event.title.toLowerCase()).includes((this.filterByEvent?.nativeElement.value).toLowerCase())
        })
    } else{
      this.filteredEventsList = this.initEventsList
    }
  }
}
