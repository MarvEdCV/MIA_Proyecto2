import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email: any;
  password: any;
  nombre: any;
  telefono: any;
  genero: any;
  apellido: any;
  foto: any;
  FechaN: any;
  FechaR: any;
  Direccion: any;
  membresia: any;
  pais: any;

  constructor(public LoginService: LoginService,private router:Router) { }

  registrar(){
    const user ={nombre: this.nombre,apellido: this.apellido,pais:this.pais,fecha:this.FechaN,email:this.email,pwd:this.password,foto:this.foto,direccion:this.Direccion,telefono:this.telefono};
    if (this.nombre.trim().length === 0||
      this.apellido.trim().length === 0 ||
      this.pais.trim().length === 0 ||
      this.FechaN.trim().length === 0 ||
      this.email.trim().length === 0 ||
      this.password.trim().length === 0 ||
      this.foto.trim().length === 0 ||
      this.Direccion.trim().length === 0 ||
      this.telefono.trim().length === 0){ 
        alert('Alguno de los campos se encuentra vacio favor de llenarlo')
      return
      }

    this.LoginService.Registro(user).subscribe((data)=>{
      alert('Usuario Creado con éxito!!')
      this.router.navigate(['/login'])
    
      
    },(err)=>{
      if(err.status===422){
        alert('Este correo ya esta registrado!!')
      }else{
        alert('Error pendiente')
      }
    })
  
  }

  ngOnInit(): void {
  }

}
