import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenInterceptorService } from './token-interceptor.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient, private interceptor: TokenInterceptorService) { }

  login(data: any): Observable<any>
  {
   return this.http.post('http://localhost:8080/api/login', data);
  }
  register(data: any): Observable<any>
  {
    return this.http.post('http://localhost:8080/api/registeruser', data);
  }
}
