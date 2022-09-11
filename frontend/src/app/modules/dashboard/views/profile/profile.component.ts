import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
import { User } from '@etp/shared/interfaces'
// Services
import { EventServiceService } from '@etp/dashboard/services';
import { UserServiceService } from '@etp/shared/services';
// Components
import { ModalMsgComponent } from '@etp/shared/components';

@Component({
  selector: 'etp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User
  loggedUser!: User
  
  cantEventsCreated!: number
  cantEventsFollowed!: number
  createdEvents!: Event[]
  followedEvents!: Event[]
  routeParam!: string | null

  constructor(
    private eventService: EventServiceService,
    private userService: UserServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeParam = params.get("id");
      const id = this.activatedRoute.snapshot.paramMap.get('id');
    
      // Get user from observable
      this.userService.getUser().subscribe({
        next: (user: User) => {
          this.loggedUser = user
      }, error: () => {}})

      // get user info --> BE
      if (id) {  
        this.userService.getOneUser(parseInt(id, 10))
        .subscribe({
          next: (res) => { 
            this.user = res.user 
          },
          error: ((err: any) => {
            const dialogRef = this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar obtener informacion del usuario' }})
            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['/dashboard/feed']);
            });
          })
        })

        // get created events by this user  --> BE
        this.eventService.getEventsCreatedByUser(parseInt(id, 10))
        .subscribe({
          next: (res) => {
              this.createdEvents = res.events
              // Sort created events by init date
              this.createdEvents.sort( 
                function(a, b) {          
                   if (a.finished === b.finished) {
                      return ((new Date(b.init_date)) < (new Date(a.init_date))) ? 1 : -1;
                   }
                   return new Date(b.init_date) > new Date(a.init_date) ? 1 : -1;
                });
              this.cantEventsCreated = this.createdEvents.length 
          },
          error: ((err: any) => {
            const dialogRef = this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar obtener los eventos creado por el usuario' }})
            dialogRef.afterClosed().subscribe(_ => { this.router.navigate(['/dashboard/feed']) });
          })
        })
        
        // // get followed events --> BE
        this.eventService.getEventsFollowedByUser(parseInt(id, 10))
        .subscribe({
          next: (res) => {
              this.followedEvents = res.events
              // Sort followed events by init date
              this.followedEvents.sort(
                function(a, b) {          
                   if (a.finished === b.finished) {
                      return ((new Date(b.init_date)) < (new Date(a.init_date))) ? 1 : -1;
                   }
                   return new Date(b.init_date) > new Date(a.init_date) ? 1 : -1;
                });
              this.cantEventsFollowed = this.followedEvents.length 
               
          },
          error: ((err: any) => {
            const dialogRef = this.dialog.open(ModalMsgComponent, { data: { title: 'Error', msg: 'Ocurrió un error al intentar obtener los eventos en los que participó el usuario' }})
            dialogRef.afterClosed().subscribe(_ => { this.router.navigate(['/dashboard/feed']) });
          })
        })
      }
    })
  }
}
