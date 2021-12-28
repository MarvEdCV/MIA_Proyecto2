import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RouterModule , Routes  } from '@angular/router';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { VerificacionComponent } from './Componentes/verificacion/verificacion.component';
import { AdminComponent } from './Componentes/admin/admin.component';
import { ContraOlvidadaComponent } from './Componentes/contra-olvidada/contra-olvidada.component';
import { CargaMasivaComponent } from './Componentes/carga-masiva/carga-masiva.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RegistroComponent,
    AdminComponent,
    ContraOlvidadaComponent,
    VerificacionComponent,
    CargaMasivaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
