import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';
import partidos from 'src/assets/json/Prueba.json';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  Partidoslist: any = partidos;
  Equipos:string[]=["hola","que","tal", "estas"];
  ListaEquipos:string[]=[];
  json:any;
  json2:any;
  selecEquipo: any;
  selecEstado: any;
  ListaEstados:string[]=[];
  jsonPartido:any;
  jsonPartidoE:any;
  constructor(public LoginService: LoginService,private router:Router) { }

  ngOnInit(): void {
    this.LoginService.MostrarEquipos().subscribe((data)=>{
      this.json = JSON.parse(data);
      console.log(this.json.result.equipo.length)
      for(var i=0;i<this.json.result.equipo.length;i++){
        this.ListaEquipos.push(this.json.result.equipo[i][1]);
      }
    })

    this.LoginService.MostrarEstados().subscribe((data)=>{
      this.json2 = JSON.parse(data);
      console.log(this.json2.result.equipo.length)
      for(var i=0;i<this.json2.result.equipo.length;i++){
        console.log(this.json2.result.equipo[i][0])
        this.ListaEstados.push(this.json2.result.equipo[i][0]);
      }
    })    
  }
  botonprueba(){
    const equipo = {nombre:this.selecEquipo}
    this.LoginService.Suscribirse(equipo).subscribe((data)=>{
      alert('suscrito con exito pa')
    })
    console.log(this.selecEquipo);
  }
  Membresia(){
    this.LoginService.ComprarMembrecia().subscribe((data)=>{
      alert('Has adquirido una nueva membresia :D')
    })
  }
  Partidos(){
    this.LoginService.Partidos().subscribe((data)=>{
      console.log(data);
      this.jsonPartido=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA PAGO
    })
  }
  PartidosEstado(){
    const estado = {estado:this.selecEstado}
    console.log(estado)
    this.LoginService.PartidosEstado(estado).subscribe((data)=>{
      console.log(data);
      this.jsonPartidoE=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
  BotonNoticias(){
    this.LoginService.RepoNoticias().subscribe((data)=>{
      console.log(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA PAGO
    })
  }

}
