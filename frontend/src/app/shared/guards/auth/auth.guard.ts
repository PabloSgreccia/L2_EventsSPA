import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// Services
import { UserServicesService } from '@etp/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private userServices: UserServicesService
  ){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.userServices.loggedIn()) {
      return true;
    }
    this.router.navigate(['/signmenu']);
    return false
  }
  canLoad(route: Route,segments: UrlSegment[]): boolean{
    if (this.userServices.loggedIn()) {
      return true;
    }
    this.router.navigate(['/signmenu']);
    return false
  }
}