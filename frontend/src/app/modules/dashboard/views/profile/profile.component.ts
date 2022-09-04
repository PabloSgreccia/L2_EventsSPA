import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Interfaces
import { Event } from '@etp/dashboard/interfaces'
import { User } from '@etp/shared/interfaces'
// Services
import { EventServiceService } from '@etp/dashboard/services';
import { UserServiceService } from '@etp/shared/services';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../../components/modal-error/modal-error.component';

@Component({
  selector: 'etp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User

  cantEvents!: number
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
    
      // get user info --> BE
      if (id) {  
        this.userService.getOneUser(parseInt(id, 10))
        .subscribe({
          next: (res) => { 
            this.user = res.user 
          },
          error: ((err: any) => {
            const dialogRef = this.dialog.open(ModalErrorComponent, {data: { msg: 'Something went wrong' }})
            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['/dashboard/feed']);
            });
          })
        })

        // get created events ny this user  --> BE
        this.eventService.getEventsCreatedByUser(parseInt(id, 10))
        .subscribe({
          next: (res) => {
              this.createdEvents = res.events
              // Sort created events by init date
              this.createdEvents.sort( function(a, b) { return b.init_date > a.init_date ? 1 : -1; });
              this.cantEvents = this.createdEvents.length 
          },
          error: ((err: any) => {
            console.log(err);
            // this.router.navigate(['/notfound']);
          })
        })
        
        // // get followed events --> BE
        this.eventService.getEventsFollowedByUser(parseInt(id, 10))
        .subscribe({
          next: (res) => {
              this.followedEvents = res.events
              // Sort followed events by init date
              this.followedEvents.sort(
                function(a, b) { return b.init_date > a.init_date? 1 : -1; });   
          },
          error: ((err: any) => {
            console.log(err);
            // this.router.navigate(['/notfound']);
          })
        })
      }
    })
  }
}
