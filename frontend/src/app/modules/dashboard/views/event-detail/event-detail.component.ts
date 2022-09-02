import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
// Services
import { EventServiceService } from '@etp/dashboard/services';
import { UserServiceService } from '@etp/shared/services';

interface UserEvents {
  id: number,
  name: string,
  star: boolean
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
  
  @ViewChild("quiteventtag") quiteventtag!: ElementRef;
  @ViewChild("joineventtag") joineventtag!: ElementRef;
  
  userEvents!: UserEvents[]

  constructor(
    private eventService: EventServiceService,
    private userService: UserServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void{
    // Get event information from observable
    this.eventService.getEvent().subscribe({
      next: event => {
        this.event = event
      },
      error: (err) => {
        this.router.navigate(['/notfound']);
      }
    })
    // Get logged user information from observable
    this.userService.getUser().subscribe({
      next: user => {
        this.idUser = user.id
        this.userName = user.name
      },
      error: (err) => {
        this.router.navigate(['/notfound']);
      }
    })

    // Get all the users subscribed in this event
    this.eventService.getUsersByEvent(this.event.id)
    .subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.userEvents = res.users
          const resultado = this.userEvents.find( user => user.id === this.idUser );
          resultado? this.userParticipateEvent = true : this.userParticipateEvent = false
        } 
        else{
          this.userEvents = [
            {
              id: 0,
              name: 'Sorry, something went wrong.',
              star: false
            }]
        }       
      },
      error: ((err: any) => {
        this.userEvents = [
          {
            id: 0,
            name: 'Sorry, something went wrong.',
            star: false
          }]
      })
    })
    
    // Sort users to show the best ones first
    this.userEvents.sort(
      function(a, b) {          
         if (a.star === b.star) {
            return ((a.name || 0) < (b.name || 0)) ? 1 : -1;
         }
         return a.star < b.star ? 1 : -1;
      });
  }

  // User joins the event
  joinEvent(){
    this.event.people = (this.event.people || 0) + 1  
    this.userParticipateEvent = true
    this.userEvents.push({
      id: this.idUser,
      name: this.userName,
      star: false
    })
    this.userService.userJoinsEvent(this.event.id).subscribe()
  }
  
  // User quits the event
  quitEvent(){
    this.event.people = (this.event.people || 0) - 1  
    this.userParticipateEvent = false
    this.userEvents = this.userEvents.filter(user => user.id !== this.idUser)
    this.userService.userJoinsEvent(this.event.id).subscribe()
  }

  // Event admin cancels the event
  cancelEvent(){
    this.eventService.cancelEvent(this.event.id, true).subscribe()
  }

  // Event admin deletes the event
  deleteEvent(){
    this.eventService.deleteEvent(this.event.id).subscribe()
  }

  // Open the edit-event view
  editEvent(){
    this.router.navigate(['/dashboard/editEvent']);
  }

  // Event admin fav a user
  favuser(idUser: number, fav: boolean){
    this.userEvents = this.userEvents.map(function(user){
      if (user.id === idUser) {
        user.star = fav
      }
      return user})
    this.userService.userFavedForEvent(idUser, this.event.id, fav).subscribe()
  }

}
