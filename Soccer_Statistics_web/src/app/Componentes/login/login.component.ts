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

  constructor(public LoginService: LoginService,private router:Router) { }
  login(){

    
    const user = {email: this.email, pwd: this.password};
    this.LoginService.Login(user).subscribe((data)=>{
        this.router.navigate(['/Registro']);
        console.log(data);
    },(err)=>{
      if(err.status===403){
        alert('Correo no confirmado!!')
      }else if(err.status===401){
        alert('Correo o contraseña invalida!!') 
      }
    })
  }

  ngOnInit(): void {
  }

}
