import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';
@Component({
  selector: 'app-repo-clientes',
  templateUrl: './repo-clientes.component.html',
  styleUrls: ['./repo-clientes.component.css']
})
export class RepoCLientesComponent implements OnInit {
  jugador:any;
  selecCompeticion: any;
  selecPais: any;
  anios:any;
  selecPaisE:any;
  capacidad:any;
  selecEquipo1:any;
  selecCompeticion2:any;
  anio:any;
  selecEquipo2:any;
  json:any
  json1:any;
  json2:any;
  ListaEquipos:string[]=[];
  ListaPaises:string[]=[];
  ListaCompeticiones:string[]=[]; 
  jsonR4:any;
  jsonR5:any;
  jsonR6:any;
  jsonR7:any;
  jsonR8:any;
  jsonR9:any;
  jsonR17:any;
  jsonR15:any;
  jsonR12:any;
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
    this.LoginService.MostrarCompeticiones().subscribe((data)=>{
      console.log(data)
      this.json1 = JSON.parse(data);
      console.log(this.json1.result.equipo.length)
      for(var i=0;i<this.json1.result.equipo.length;i++){
        this.ListaCompeticiones.push(this.json1.result.equipo[i]);
      }
    })
  }

  Reporte4(){
    const competi ={nombre:this.selecCompeticion}
    this.LoginService.Reporte4(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR4=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte5(){
    const competi ={nombre:this.selecPais}
    this.LoginService.Reporte5(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR5=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte6(){
    const competi ={numero:this.anios}
    this.LoginService.Reporte6(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR6=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte7(){
    const competi ={nombre:this.selecPaisE}
    this.LoginService.Reporte7(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR7=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte8(){
    const competi ={numero:this.capacidad}
    this.LoginService.Reporte8(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR8=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte9(){
    const competi ={nombre:this.selecEquipo1}
    this.LoginService.Reporte9Y17(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR9=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte17(){
    const competi ={nombre:this.selecEquipo2}
    this.LoginService.Reporte9Y17(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR17=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte15(){
    const competi ={numero:this.anio}
    this.LoginService.Reporte15(competi).subscribe((data)=>{
      console.log(data);
      this.jsonR15=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  Reporte12(){
    this.LoginService.Reporte12().subscribe((data)=>{
      console.log(data);
      this.jsonR12=JSON.parse(data);
    })
  }
}
