import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';
@Component({
  selector: 'app-reg-adm-emp',
  templateUrl: './reg-adm-emp.component.html',
  styleUrls: ['./reg-adm-emp.component.css']
})
export class RegAdmEmpComponent implements OnInit {
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
  pais:any;

  Eemail: any;
  Epassword: any;
  Enombre: any;
  Eapellido: any;


  constructor(public LoginService: LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  RegistrarAdmin(){
    const user ={nombre: this.nombre,apellido: this.apellido,pais:this.pais,fecha:this.FechaN,email:this.email,pwd:this.password,foto:this.foto,direccion:this.Direccion,telefono:this.telefono,genero:this.genero};
    if (this.nombre.trim().length === 0||
      this.apellido.trim().length === 0 ||
      this.pais.trim().length === 0 ||
      this.FechaN.trim().length === 0 ||
      this.email.trim().length === 0 ||
      this.password.trim().length === 0 ||
      this.foto.trim().length === 0 ||
      this.Direccion.trim().length === 0 ||
      this.telefono.trim().length === 0 ||
      this.genero.trim().length ===0){ 
        alert('Alguno de los campos se encuentra vacio favor de llenarlo')
      return
      }

    this.LoginService.RegistroAdmin(user).subscribe((data)=>{
      alert('Administrador Creado con éxito!!')
      this.router.navigate(['/login'])
    
      
    },(err)=>{
      if(err.status===422){
        alert('Este correo ya esta registrado!!')
      }else{
        alert('Error pendiente')
      }
    })
  }

  RegistrarEmpleado(){
    const user = {nombre:this.Enombre,apellido:this.Eapellido,email:this.Eemail,pwd:this.Epassword}
    this.LoginService.RegistroEmpleado(user).subscribe((data)=>{
      alert('Empleado Creado con éxito!!')
      this.router.navigate(['/login'])
    
      
    },(err)=>{
      if(err.status===422){
        alert('Este correo ya esta registrado!!')
      }else{
        alert('Error pendiente')
      }
    })
  }

}
