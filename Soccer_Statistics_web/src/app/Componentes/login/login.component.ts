import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string="";
  password: string="";

  emailE: string="";
  passwordE: string="";

  emailA: string="";
  passwordA: string="";
  pass: string="PWD$12345$pwd";

  constructor(public LoginService: LoginService,private router:Router) { }
  login(){
    const user = {email: this.email, pwd: this.password};
    this.LoginService.Login(user).subscribe((data)=>{
        this.router.navigate(['/usuarios']);
        console.log(data);
    },(err)=>{
      if(err.status===403){
        alert('Correo no confirmado!!')
      }else if(err.status===401){
        alert('Correo o contraseña invalida!!') 
      }
    })
  }
  loginAdmin(){
    const user = {email: this.emailA, pwd: this.passwordA};
    this.LoginService.Login(user).subscribe((data)=>{
        this.router.navigate(['/Admi']);
        console.log(data);
    },(err)=>{
      if(err.status===403){
        alert('Correo no confirmado!!')
      }else if(err.status===401){
        alert('Acceso Denegado no eres admin !!') 
      }
    })
  }
  loginEmpleado(){
    const user = {email: this.emailE, pwd: this.passwordE};
    this.LoginService.LoginEmpleado(user).subscribe((data)=>{
        this.router.navigate(['/Empleados']);
        console.log(data);
    },(err)=>{
      if(err.status===403){
        alert('Correo no confirmado!!')
      }else if(err.status===401){
        alert('Acceso Denegado no eres Empleado !!') 
      }
    })
  }

  contra(){
    const user = {email: this.email, pwd: this.pass};
    if(this.email.trim().length === 0){
      alert('El campo debe estar lleno para poder realizar esta accion')
      return
    }
    this.LoginService.RestablecerContra(user).subscribe((data)=>{
      alert('Se envio contraseña nueva a su email!')
      console.log(data);
    })
  }

  ngOnInit(): void {
  }



}
