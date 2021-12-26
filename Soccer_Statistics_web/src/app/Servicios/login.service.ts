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
  
  return this.http.post<any>("http://localhost:4015/login",user,options);
}

Registro(user:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/registrar",user,options);

}

VerificarCuenta(id:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>(`http://localhost:4015/EstadoCuenta/${id}`,options);
}
}