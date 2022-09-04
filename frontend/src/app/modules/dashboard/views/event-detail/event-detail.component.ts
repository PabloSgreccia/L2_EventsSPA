import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
// Services
import { EventServiceService } from '@etp/dashboard/services';
import { UserServiceService } from '@etp/shared/services';
import { ModalErrorComponent } from '../../components/modal-error/modal-error.component';
import { ActivatedRoute } from '@angular/router';

interface UserEvents {
  id: number,
  name: string,
  favourite: boolean
}

@Component({
  selector: 'etp-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event!: Event
  idUser!:number
  userName!:string
  today = new Date
  userParticipateEvent: boolean = false 
  userEvents!: UserEvents[]
  
  constructor(
    private eventService: EventServiceService,
    private userService: UserServiceService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void{
    
    // Get logged user information from observable
    this.userService.getUser().subscribe({
      next: user => {
        this.idUser = user.id
        this.userName = user.name
      },
      error: (err) => {
        this.dialog.open(ModalErrorComponent, {data: { msg: 'Something went wrong trying to cancel the event. Try again' }})
      }
    })

    // Get event information
    const eventId = this.activatedRoute.snapshot.paramMap.get("id");
    if (eventId) {
      this.eventService.getEventById(parseInt(eventId, 10))
      .subscribe({
        next: (res) => {
          this.event = res.event
          this.eventService.setEvent(this.event)

          this.event.init_date = new Date(this.event.init_date)
          this.event.end_date = new Date(this.event.end_date)
          this.userEvents = res.people
          // Search if the user already participates in this event
          const resultado = this.userEvents.find( user => user.id === this.idUser );
          resultado? this.userParticipateEvent = true : this.userParticipateEvent = false
        },
        error: ((err: any) => {  
          const dialogRef = this.dialog.open(ModalErrorComponent, {data: { msg: 'Something went wrong' }})
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/dashboard/feed']);
          });
        })
      })
    } else {
      const dialogRef = this.dialog.open(ModalErrorComponent, {data: { msg: 'Something went wrong' }})
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/dashboard/feed']);
      });
    }
    
    // Sort users to show the best ones first
    if (this.userEvents) { 
      this.userEvents.sort( function(a, b) {          
        if (a.favourite === b.favourite) {
          return ((a.name || 0) < (b.name || 0)) ? 1 : -1;
        }
        return a.favourite < b.favourite ? 1 : -1;
      });
    }
  }

  // User joins the event
  joinEvent(){
    this.event.cantPeople = (this.event.cantPeople || 0) + 1  
    this.userParticipateEvent = true
    this.userEvents.push({
      id: this.idUser,
      name: this.userName,
      favourite: false
    })
    this.userService.userJoinsEvent(this.event.id).subscribe()
  }
  
  // User quits the event
  quitEvent(){
    this.event.cantPeople = (this.event.cantPeople || 0) - 1  
    this.userParticipateEvent = false
    this.userEvents = this.userEvents.filter(user => user.id !== this.idUser)
    this.userService.userLeftEvent(this.event.id).subscribe()
  }

  // Event admin cancels the event
  cancelEvent(){
    this.eventService.cancelEvent(this.event.id, true)
    .subscribe({
      next: (res) => {
        this.eventService.setEvent(res.updatedEvent)
      },
      error: ((err: any) => {  this.dialog.open(ModalErrorComponent, {data: { msg: 'Something went wrong trying to cancel the event. Try again' }})})
    })
  }

  // Event admin deletes the event
  deleteEvent(){
    this.eventService.deleteEvent(this.event.id)
    .subscribe({
      next: (res) => {
        this.eventService.setEvent(res.updatedEvent)
        this.router.navigate(['/dashboard/feed']);
      },
      error: ((err: any) => {  
        const dialogRef = this.dialog.open(ModalErrorComponent, {data: { msg: 'Something went wrong trying to delete the event. Try again' }})
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/dashboard/feed']);
        });
      })
    })
  }

  // Event admin fav a user
  favuser(idUser: number, fav: boolean){
    if (this.event.user.id === this.idUser ) {
      this.userEvents = this.userEvents.map(function(user){
        if (user.id === idUser) {
          user.favourite = fav
        }
        return user})
      this.userService.userFavedForEvent(idUser, this.event.id, fav).subscribe()
    }
  }

}
