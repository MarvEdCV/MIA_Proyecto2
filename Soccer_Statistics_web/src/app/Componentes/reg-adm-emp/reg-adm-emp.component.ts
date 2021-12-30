import { Component, OnInit } from '@angular/core';

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
  membresia: any;
  pais: any;
  noticias: any;


  constructor() { }

  ngOnInit(): void {
  }

}
