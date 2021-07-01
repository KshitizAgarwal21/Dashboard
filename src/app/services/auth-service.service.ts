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

  addusage(data: any): Observable<any>{
    return this.http.post("http://localhost:8080/api/addusage", data);
  }

  getData(): Observable<any>{

    return this.http.get("http://localhost:8080/api/getdata");
  }
  getUsers(): Observable<any>{

    return this.http.get('http://localhost:8080/api/getusers');
  }



}
