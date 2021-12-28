import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Componentes/admin/admin.component';
import { CargaMasivaComponent } from './Componentes/carga-masiva/carga-masiva.component';
import { ContraOlvidadaComponent } from './Componentes/contra-olvidada/contra-olvidada.component';
import { LoginComponent } from './Componentes/login/login.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { VerificacionComponent } from './Componentes/verificacion/verificacion.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'Principal',
    component:PrincipalComponent
  },
  {
    path:'Registro',
    component:RegistroComponent
  },
  {
    path:'Admi',
    component:AdminComponent
  },{
    path:'Verificacion/:id',
    component:VerificacionComponent
  }
  ,
  {
    path:'contra',
    component:ContraOlvidadaComponent
  }
  ,
  {
    path:'carga',
    component:CargaMasivaComponent
  }
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
