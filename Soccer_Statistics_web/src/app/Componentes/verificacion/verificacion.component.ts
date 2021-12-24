import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';
import { LoginService } from 'src/app/Servicios/login.service';
@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  constructor(public activate: ActivatedRoute,public LoginService: LoginService,private router:Router) { }

  ngOnInit():void{
    const parm = this.activate.snapshot.params
    const id = parm['id']
    this.LoginService.VerificarCuenta(id).subscribe((data)=>{
      console.log(data)
      //this.router.navigate(['/signin'])
    }, (err) => {
      console.log(err)
    })
  }
}
