import { Component, OnInit } from '@angular/core';

import partidos from 'src/assets/json/Prueba.json';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  Partidoslist: any = partidos;
  Equipos:string[]=["hola","que","tal", "estas"];

  constructor() { }

  ngOnInit(): void {
  }

}
