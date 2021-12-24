import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Componentes/admin/admin.component';
import { LoginComponent } from './Componentes/login/login.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { RegistroComponent } from './Componentes/registro/registro.component';

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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
