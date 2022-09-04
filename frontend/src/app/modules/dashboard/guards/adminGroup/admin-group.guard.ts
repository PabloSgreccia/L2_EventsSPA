import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { UserServiceService } from '@etp/shared/services';
import { Observable } from 'rxjs';
import { EventServiceService } from '../../services/eventService/event-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private eventService: EventServiceService,
  ){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    let userid = 0
    let userEventid = 100
    // get user by observable
    this.userService.getUser().subscribe({
      next: user => {
        userid = user.id
      },
      error: (err) => {}
    })
    // get event byu observable
    this.eventService.getEvent().subscribe({
      next: event => {
        userEventid = event.user.id
      },
      error: (err) => {}
    })

    if (userid === userEventid) {       
      return true;
    } else {
      this.router.navigate(['/dashboard/feed']);
      return false
    }
  }
  
}