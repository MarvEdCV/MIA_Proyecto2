import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-clientes',
  templateUrl: './repo-clientes.component.html',
  styleUrls: ['./repo-clientes.component.css']
})
export class RepoCLientesComponent implements OnInit {
  jugador:any;
  selecCompeticion: any;
  selecPais: any;
  anios:any;
  selecPaisE:any;
  capacidad:any;
  selecEquipo1:any;
  selecCompeticion2:any;
  anio:any;
  selecEquipo2:any;

  constructor() { }

  ngOnInit(): void {
  }

}
