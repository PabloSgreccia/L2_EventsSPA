import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '@etp/auth/services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authServices: AuthService,
  ){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.authServices.isAdmin()) {
       
      return true;
    } else {
      this.router.navigate(['/dashboard/feed']);
      return false
    }
  }
  
  canLoad(route: Route,segments: UrlSegment[]): boolean{
    if (this.authServices.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/dashboard/feed']);
      return false
    }
  }
}