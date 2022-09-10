import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@etp/auth/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private authService: AuthService
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url == 'https://api.imgur.com/3/image/') {
      const tokenizeReq = req.clone()
      return next.handle(tokenizeReq);
    }
    else {
      const tokenizeReq = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.authService.getToken()}`
        }
      })
      return next.handle(tokenizeReq);
    }
  }
}
