import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// Services
import { AuthService } from '@etp/auth/services';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '../../services/userService/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authServices: AuthService,
    private userService: UserServiceService
  ){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.authServices.loggedIn()) {
       
      return true;
    } else {
      this.router.navigate(['/signmenu']);
      return false
    }
  }
  
  canLoad(route: Route,segments: UrlSegment[]): boolean{
    if (this.authServices.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/signmenu']);
      return false
    }
  }
}