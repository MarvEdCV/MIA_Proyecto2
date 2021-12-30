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

RestablecerContra(user:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/RestablecerContra",user,options);
}

LlenarEstadios(path:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/carga-estadios",path,options);
}

LlenarTecnicos(path:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/carga-directores",path,options);
}

LlenarEquipos(path:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/carga-equipos",path,options);
}

LlenarJugadores(path:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/carga-jugadores",path,options);
}

LlenarCompeticion(path:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/carga-competicion",path,options);
}

LlenarPartido(path:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/carga-partidos-incidencias",path,options);
}



}