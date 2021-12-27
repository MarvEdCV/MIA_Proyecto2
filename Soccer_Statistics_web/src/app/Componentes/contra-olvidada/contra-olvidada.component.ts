import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';
@Component({
  selector: 'app-contra-olvidada',
  templateUrl: './contra-olvidada.component.html',
  styleUrls: ['./contra-olvidada.component.css']
})
export class ContraOlvidadaComponent implements OnInit {
  email: string="";
  password: string="";

  constructor(public LoginService: LoginService,private router:Router) { }

  ngOnInit(): void {
  }

}
