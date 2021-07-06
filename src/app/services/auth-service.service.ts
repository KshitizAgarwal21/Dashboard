import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenInterceptorService } from './token-interceptor.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient, private interceptor: TokenInterceptorService) { }
 devUrl = "http://localhost:8080/api/";
 prodUrl = "http://ec2-52-15-155-11.us-east-2.compute.amazonaws.com:3000/api/"
  login(data: any): Observable<any>
  {
   return this.http.post(this.prodUrl+`login`, data);
  }
  register(data: any): Observable<any>
  {
    return this.http.post(this.prodUrl+ `registeruser`, data);
  }

  addusage(data: any): Observable<any>{
    return this.http.post( this.prodUrl+ `addusage`, data);
  }

  getData(): Observable<any>{

    return this.http.get( this.prodUrl+`getdata`);
  }
  getUsers(): Observable<any>{

    return this.http.get(this.prodUrl+`getusers`);
  }

  uploadFile(file:any): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.prodUrl+ `upload`, formData);
  }
  }
