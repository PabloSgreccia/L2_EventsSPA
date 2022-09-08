import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalBeforeDeleteComponent } from '@etp/dashboard/components';
// Services
import { EventServiceService } from '@etp/dashboard/services';
import { ModalMsgComponent } from '@etp/shared/components';


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
  msg!:string

  @ViewChild("filterByEvent") filterByEvent: ElementRef | undefined;
  
  constructor(
    private eventService: EventServiceService,
    public dialog: MatDialog,
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
      error: (err) => {
        this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar obtener la lista de eventos.' } });
      }
    })
  }

  // delete event
  deleteEvent(id:number){
    const dialogRef = this.dialog.open(ModalBeforeDeleteComponent, { data: { model: 'evento', id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.deleteEvent(id).subscribe({
          next: res => {
            this.initEventsList = this.initEventsList.filter(event => event.id !== id);
            this.filteredEventsList = this.filteredEventsList.filter(event => event.id !== id);
            this.msg = `Evento con ID ${id} eliminado`;
            setTimeout(()=>{ this.msg = '' }, 3000);     
          },
          error: (err) => {
            this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar borrar el evento.' } });
          }
        }) 
      }}
    )
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
