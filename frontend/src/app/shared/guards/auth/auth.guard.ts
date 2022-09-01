import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
// Services
import { AuthService } from '@etp/auth/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authServices: AuthService,
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