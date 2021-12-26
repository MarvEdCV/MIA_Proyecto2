import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contra-olvidada',
  templateUrl: './contra-olvidada.component.html',
  styleUrls: ['./contra-olvidada.component.css']
})
export class ContraOlvidadaComponent implements OnInit {
  email: string="";
  password: string="";

  constructor() { }

  ngOnInit(): void {
  }

}
