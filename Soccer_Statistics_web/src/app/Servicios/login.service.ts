import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  Login(user:any){
    const options = {responseType: 'text' as 'json'};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }; 
    return this.http.post<any>("http://localhost:4015/login",user,options);
}
}