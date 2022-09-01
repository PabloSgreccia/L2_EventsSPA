import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
import { User } from "@etp/shared/interfaces";
// Services
import { EventServiceService } from '@etp/dashboard/services';
import { UserServiceService } from '@etp/shared/services';

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
  
  userEvents = [
    {
      id: 123,
      name: 'Juan Carlos',
      star: false
    },
    {
      id: 435,
      name: 'Julian Benitez',
      star: false
    },
    {
      id: 124,
      name: 'Lebron James',
      star: true
    },
    {
      id: 678,
      name: 'Luis Felipe',
      star: false
    },
    {
      id: 378,
      name: 'Adrián Romano',
      star: false
    },
    {
      id: 334,
      name: 'Federico Newman',
      star: false
    }
  ]

  message:string = '';

  constructor(
    private eventService: EventServiceService,
    private userService: UserServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void{
    this.eventService.getEvent().subscribe({
      next: event => {
        this.event = event
      },
      error: (err) => {}
    })
    // this.event = this.eventService.getEvent() 
    this.userService.getUser().subscribe({
      next: user => {
        this.idUser = user._id
        this.userName = user.name
      },
      error: (err) => {}
    })

    this.eventService.getUsersByEvent(this.event._id)
    .subscribe({
      next: (res) => {
        if (res.status === 200) {
          // ok
          this.userEvents = res
          const resultado = this.userEvents.find( user => user.id === this.idUser );
          resultado? this.userParticipateEvent = true : this.userParticipateEvent = false
        } 
        else{}       
      }
      ,
      error: ((err: any) => {
        // this.router.navigate(['/notfound']);
        // console.log(err);
      })
    })
    
    this.userEvents.sort(
      function(a, b) {          
         if (a.star === b.star) {
            return ((a.name || 0) < (b.name || 0)) ? 1 : -1;
         }
         return a.star < b.star ? 1 : -1;
      });
  }

  joinEvent(){
    this.event.people = (this.event.people || 0) + 1  
    this.userParticipateEvent = true
    this.userEvents.push({
      id: this.idUser,
      name: this.userName,
      star: false
    })
    this.userService.userJoinsEvent(this.idUser, this.event._id)
  }
  
  quitEvent(){
    this.event.people = (this.event.people || 0) - 1  
    this.userParticipateEvent = false
    this.userEvents = this.userEvents.filter(user => user.id !== this.idUser)
    this.userService.userJoinsEvent(this.idUser, this.event._id)
  }

  cancelEvent(){
    this.eventService.cancelEvent(this.event._id, true)
  }

  deleteEvent(){
    this.eventService.deleteEvent(this.event._id)
  }

  editEvent(){
    this.router.navigate(['/dashboard/editEvent']);
  }

  favuser(idusuario: number, fav: boolean){
    this.userEvents = this.userEvents.map(function(user){
      if (user.id === idusuario) {
        user.star = fav
      }
      return user})
    
    this.userService.userFavedForEvent(idusuario, this.event._id, fav)
  }

}
