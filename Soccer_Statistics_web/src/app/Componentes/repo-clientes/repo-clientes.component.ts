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

}
