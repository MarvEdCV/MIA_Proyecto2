import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  noticia: any;
  FechaN: any;
  Equipo:any;


  constructor() { }

  ngOnInit(): void {
  }

}