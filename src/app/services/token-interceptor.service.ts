import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const userToken = localStorage.getItem('token');
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `${userToken}`),
    });
    return next.handle(modifiedReq);
  }

  constructor() { }
}
