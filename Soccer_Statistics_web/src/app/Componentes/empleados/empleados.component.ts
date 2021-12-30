import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  noticia: any;
  FechaN: any;
  Equipo:any;


  constructor(public LoginService: LoginService,private router:Router) { }

  ngOnInit(): void {
    //AGREGAR PARA QUE SE CARGUEN LOS EQUIPOS YA REGISTRADOS
  }

  Noticia(){
    if(this.noticia.trim().length===0){
      alert('llene todos los campos por favor')
      return
    }
    console.log(this.Equipo)
    const noticia = {
      noticia:this.noticia,
      equipo: this.Equipo
    }
    this.LoginService.GenerarNoticia(noticia).subscribe((data)=>{
      console.log(data)
      alert('noticia generada con exito')
    },(err)=>{
      if(err.status===500){
        alert(
          'El equipo no existe'
        )
      }
    })
  }

}
