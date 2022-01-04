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
LoginEmpleado(user:any){
  const options = {responseType: 'text' as 'json'}; 
  return this.http.post<any>("http://localhost:4015/login-empleado",user,options);
}
Registro(user:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/registrar",user,options);
}
RegistroAdmin(user:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/registrar-admin",user,options);
}
RegistroEmpleado(user:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/registrar-empleado",user,options);
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

MostrarEquipos(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/consultar-equipos",options);
}
MostrarPaises(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/consultar-paises",options);
}
MostrarPaisesEstadios(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/consultar-paises-estadios",options);
}
MostrarPaisesEquipos(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/consultar-paises-equipos",options);
}
MostrarEstados(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/consultar-estados",options);
}
MostrarCompeticiones(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/consultar-competiciones",options);
}
Suscribirse(equipo:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/suscribirse",equipo,options);
}
ComprarMembrecia(){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/membresia",options);
}
GenerarNoticia(noticia:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/noticias",noticia,options);
}
ConsultaSuscripciones(equipo:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/suscritos-x-equipo",equipo,options);  
}
ConsultaUsersPorPais(equipo:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/users-x-pais",equipo,options);  
}
ConsultaUsersPorGenero(genero:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/users-x-genero",genero,options);  
}
ConsultaUsersPorEdad(edad:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/users-x-edad",edad,options);  
}
Pago(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/suscritos-pago",options);
}
Gratis(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/suscritos-gratis",options);
}

MasNoticias(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/empleado-desc",options);
}
MenosNoticias(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/empleado-asc",options);
}
MasNoticiasxequipo(equipo:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/empleado-desc-xequipo",equipo,options);
}
MenosNoticiasxequipo(equipo:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/empleado-asc-xequipo",equipo,options);
}

Partidos(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/partidos",options);
}

PartidosEstado(estado:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/partidos-estado",estado,options);
}
Reporte4(obj:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/reporte4",obj,options);
}
Reporte6(obj:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/reporte6",obj,options);
}
Reporte7(obj:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/reporte7",obj,options);
}
Reporte8(obj:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/reporte8",obj,options);
}
Reporte9Y17(obj:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/reporte9y17",obj,options);
}
Reporte5(obj:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/reporte5",obj,options);
}
Reporte15(obj:any){
  const options = {responseType: 'text' as 'json'};
  return this.http.post<any>("http://localhost:4015/reporte15",obj,options);
}
Reporte12(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/reporte12",options);
}
RepoNoticias(){
  const options = {responseType: 'text' as 'json'};
  return this.http.get<any>("http://localhost:4015/repo-noticias",options);
}
}