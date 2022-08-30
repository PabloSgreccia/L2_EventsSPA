import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventServiceService } from '@etp/shared/services';
import { Event, User } from "@etp/shared/interfaces";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'etp-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event: Event =
  {
    _id: 2,
    title: 'Partido vs Atalaya',
    province: 'Santa Fe',
    city: 'Rosario',
    street: 'San Juan',
    number: 3550,
    init_date: new Date(2022, 9, 2, 23, 0, 0),
    end_date: new Date(2022, 10, 10, 7, 0, 0),
    cancelled: false,
    type: 'Fiesta',
    photo: 'https://www.competize.com/blog/wp-content/uploads/2019/12/crear-torneos-basquet-baloncesto-scaled.jpg',
    finished: false,
    adminUser: 'Pablo Sgreccia',
    adminUserId: 24,
    people: 67,
    verifiedadmin: true, 
    adminPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WeNyqqvZ4xPqhmoF5Jcz3UYO_Gk2AUNgSKU59LJYLETM8tElgPD2931E8-7dauowdAQ&usqp=CAU',
    participateDisabled:false,
  }
  user: User = {
    _id:24,
  }
  today = new Date

  userEvents = [
    {
      name: 'Juan Carlos',
      star: false
    },
    {
      name: 'Julian Benitez',
      star: false
    },
    {
      name: 'Lebron James',
      star: true
    },
    {
      name: 'Luis Felipe',
      star: false
    },
    {
      name: 'Adrián Romano',
      star: false
    },
    {
      name: 'Federico Newman',
      star: false
    },
    {
      name: 'Alejandra Ramirez',
      star: false
    },
  ]

  message:string = '';

  private localKey="event";
  // myVal = new BehaviorSubject(localStorage.getItem(this.localKey)??null);

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventServiceService
  ) { }

  ngOnInit(): void{
    // this.event = this.eventService.getEvent()

    // this.eventService.currentApprovalStageMessage.subscribe(event => this.event = event);

    // get user events --> BE
    // get logged user info --> FE

    // this.eventService.currentApprovalStageMessage.subscribe(newVal =>{
    //   localStorage.setItem(this.localKey,JSON.stringify(newVal));
    // })
    
    // var retrievedObject = localStorage.getItem('event');
    // console.log(retrievedObject);
    
    this.event = this.eventService.getEvent()
    
    this.userEvents.sort(
      function(a, b) {          
         if (a.star === b.star) {
            return ((a.name || 0) < (b.name || 0)) ? 1 : -1;
         }
         return a.star < b.star ? 1 : -1;
      });
    
  }

  
  joinEvent(id:number | undefined){
    this.event.people = (this.event.people || 0) + 1  
    this.event.participateDisabled = true
  }
}
