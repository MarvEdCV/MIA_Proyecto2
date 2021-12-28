import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {
  estadios: string="";
  tecnicos: string="";
  equipo: string="";
  jugador: string="";
  competicion: string="";
  incidencias: string="";
  partido: string="";

  constructor() { }

  ngOnInit(): void {
  }

}
