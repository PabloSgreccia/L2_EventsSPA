import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Services
import { EventServiceService } from '@etp/dashboard/services';


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
    private eventService: EventServiceService
  ) { }

  ngOnInit(): void {
    this.getEvents()
  }
  
  // Get events --> BE
  getEvents() {
    this.eventService.getManyEventAdmin()
    .subscribe({
      next: res => {
        this.initEventsList = res.events
        this.initEventsList.sort(
          function(a, b) {                 
            return b.id < a.id? 1 : -1;
          });
        this.filteredEventsList = this.initEventsList
      },
      error: (err) => {}
    })
  }

  // delete event
  deleteEvent(id:number){
    this.eventService.deleteEvent(id).subscribe(_ => this.getEvents())
  }

  // Filter by Event name
  async onKeyUp(){
    if (this.filterByEvent?.nativeElement.value.length >=1) {
      this.filteredEventsList = this.initEventsList
        .filter(event => {
          let input = (this.filterByEvent?.nativeElement.value).toLowerCase()
          let targetText = event.title.toLowerCase()
          
          if (targetText.includes(input)) {
            return true
          } else{
            return false
          }
        })
    } else{
      this.filteredEventsList = this.initEventsList
    }
  }
}
