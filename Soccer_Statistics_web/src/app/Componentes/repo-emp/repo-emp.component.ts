import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/login.service';

@Component({
  selector: 'app-repo-emp',
  templateUrl: './repo-emp.component.html',
  styleUrls: ['./repo-emp.component.css']
})
export class RepoEmpComponent implements OnInit {
  selecEquipo: any;
  ListaEquipos:string[]=[];
  json:any;
  jsonR8:any;
  jsonR81:any;
  jsonR9:any;
  jsonR91:any;
  constructor(public LoginService: LoginService,private router:Router) { }

  ngOnInit(): void {
    this.LoginService.MostrarEquipos().subscribe((data)=>{
      this.json = JSON.parse(data);
      console.log(this.json.result.equipo.length)
      for(var i=0;i<this.json.result.equipo.length;i++){
        this.ListaEquipos.push(this.json.result.equipo[i][1]);
      }
    })
  }
  Reporte8Y9(){
    this.LoginService.MasNoticias().subscribe((data)=>{
      console.log(data);
      this.jsonR8=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA PAGO
    })
    this.LoginService.MenosNoticias().subscribe((data)=>{
      console.log(data);
      this.jsonR81=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA GRATIS
    })
  }
  Reporte9Y10(){
    const equipo = {nombre:this.selecEquipo}
    this.LoginService.MasNoticiasxequipo(equipo).subscribe((data)=>{
      console.log(data);
      this.jsonR9=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
    this.LoginService.MenosNoticiasxequipo(equipo).subscribe((data)=>{
      console.log(data);
      this.jsonR91=JSON.parse(data);
      //EN DATA ESTA EL JSON CON LA CONSULTA
    })
  }
}
