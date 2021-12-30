import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {
  estadios: string="";
  tecnicos: string="";
  equipo: string="";
  jugador: string="";
  competicion: string="";
  incidencias: string="";
  partido: string="";

  constructor(public LoginService: LoginService,private router:Router) { }

  CargaEstadios(){
    const path = {ruta:this.estadios}
    if(this.estadios.trim().length===0){
      alert('Por favor llene el campo de la ruta de ESTADIOS antes de tratar hacer una carga masiva')
      return
    }
    this.LoginService.LlenarEstadios(path).subscribe((data)=>{
      alert('Se ha realizado la carga de Estadios con exito')
    },(err)=>{
      if(err.status===422){
        alert('Violacion de llaves en la base de datos')
      }else{
        alert('Error pendiente')
      }
    })
    
  }

  CargaEquipos(){
    const path = {ruta:this.equipo}
    if(this.equipo.trim().length===0){
      alert('Por favor llene el campo de la ruta de EQUIPOS antes de tratar hacer una carga masiva')
      return
    }
    this.LoginService.LlenarEquipos(path).subscribe((data)=>{
      alert('Se ha realizado la carga de Equipos con exito')
    },(err)=>{
      if(err.status===422){
        alert('Violacion de llaves en la base de datos')
      }else{
        alert('Error pendiente')
      }
    })
    
  }
  CargaDirectores(){
    const path = {ruta:this.tecnicos}
    if(this.tecnicos.trim().length===0){
      alert('Por favor llene el campo de la ruta de DIRECTORES antes de tratar hacer una carga masiva')
      return
    }
    this.LoginService.LlenarTecnicos(path).subscribe((data)=>{
      alert('Se ha realizado la carga de Directores con exito')
    },(err)=>{
      if(err.status===422){
        alert('Violacion de llaves en la base de datos')
      }else{
        alert('Error pendiente')
      }
    })
    
  }

  CargaJugadores(){
    const path = {ruta:this.jugador}
    if(this.jugador.trim().length===0){
      alert('Por favor llene el campo de la ruta de JUGADORES antes de tratar hacer una carga masiva')
      return
    }
    this.LoginService.LlenarJugadores(path).subscribe((data)=>{
      alert('Se ha realizado la carga de Jugadores con exito')
    },(err)=>{
      if(err.status===422){
        alert('Violacion de llaves en la base de datos')
      }else{
        alert('Error pendiente')
      }
    })
    
  }
  CargaCompeticion(){
    const path = {ruta:this.competicion}
    if(this.competicion.trim().length===0){
      alert('Por favor llene el campo de la ruta de COMPETICION antes de tratar hacer una carga masiva')
      return
    }
    this.LoginService.LlenarCompeticion(path).subscribe((data)=>{
      alert('Se ha realizado la carga de Competicion con exito')
    },(err)=>{
      if(err.status===422){
        alert('Violacion de llaves en la base de datos')
      }else{
        alert('Error pendiente')
      }
    })
    
  }
  CargaPartidos(){
    const path = {ruta:this.partido}
    if(this.partido.trim().length===0){
      alert('Por favor llene el campo de la ruta de PARTIDOS antes de tratar hacer una carga masiva')
      return
    }
    this.LoginService.LlenarPartido(path).subscribe((data)=>{
      alert('Se ha realizado la carga de Partidos con exito')
    },(err)=>{
      if(err.status===422){
        alert('Violacion de llaves en la base de datos')
      }else{
        alert('Error pendiente')
      }
    })
    
  }




  ngOnInit(): void {
  }

  
}
