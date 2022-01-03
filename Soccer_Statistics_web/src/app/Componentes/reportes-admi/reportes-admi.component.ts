import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';

@Component({
  selector: 'app-reportes-admi',
  templateUrl: './reportes-admi.component.html',
  styleUrls: ['./reportes-admi.component.css']
})
export class ReportesAdmiComponent implements OnInit {
  edad: number=0;
  selecEquipo: any;
  selecPais: any;
  json:any;
  ListaEquipos:string[]=[];
  json2:any;
  ListaPaises: string[]=[]
  genero:any;
  jsonR1:any;
  jsonR21:any;
  jsonR22:any;
  jsonR5:any;
  jsonR6:any;
  jsonR7:any;

  constructor(public LoginService: LoginService,private router:Router) { }

  ngOnInit(): void {
    this.LoginService.MostrarEquipos().subscribe((data)=>{
      this.json = JSON.parse(data);
      console.log(this.json.result.equipo.length)
      for(var i=0;i<this.json.result.equipo.length;i++){
        this.ListaEquipos.push(this.json.result.equipo[i][1]);
      }
    })
    this.LoginService.MostrarPaises().subscribe((data)=>{
      console.log(data)
      this.json2 = JSON.parse(data);
      console.log(this.json2.result.equipo.length)
      for(var i=0;i<this.json2.result.equipo.length;i++){
        this.ListaPaises.push(this.json2.result.equipo[i]);
      }
    })
  }

  Reporte1(){
    const equipo = {nombre:this.selecEquipo}
    this.LoginService.ConsultaSuscripciones(equipo).subscribe((data)=>{
      console.log(data);
      this.jsonR1=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }

  Reporte2(){
    this.LoginService.Pago().subscribe((data)=>{
      console.log(data);
      this.jsonR21=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA PAGO
    })
    this.LoginService.Gratis().subscribe((data)=>{
      console.log(data);
      this.jsonR22=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA GRATIS
    })
  }
  Reporte5(){
    const pais = {nombre:this.selecPais}
    this.LoginService.ConsultaUsersPorPais(pais).subscribe((data)=>{
      console.log(data);
      this.jsonR5=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte6(){
    const genero = {genero:this.genero}
    this.LoginService.ConsultaUsersPorGenero(genero).subscribe((data)=>{
      console.log(data);
      this.jsonR6=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })  
  }
  Reporte7(){
    const edad = {numero:this.edad}
    console.log(edad)
    this.LoginService.ConsultaUsersPorEdad(edad).subscribe((data)=>{
      console.log(data);
      this.jsonR7=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })  
  }
}
