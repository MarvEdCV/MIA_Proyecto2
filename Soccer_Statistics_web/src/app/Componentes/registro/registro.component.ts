import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email: string="";
  password: string="";
  nombre: string="";
  telefono: number=0;
  genero: string="";
  apellido: string="";
  foto: string="";
  FechaN: string="";
  FechaR: string="";
  Direccion: string="";
  membresia: string="";
  pais: string="";

  constructor() { }

  ngOnInit(): void {
  }

}
