import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlumnoComponent } from './alumno/alumno.component';
import { DocenteComponent } from './docente/docente.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { RouterLink } from '@angular/router';
import { MostrarQrComponent } from './mostrar-qr/mostrar-qr.component';
import { InicioComponent } from './inicio/inicio.component';
import { NoEncontradaComponent } from './no-encontrada/no-encontrada.component';


@NgModule({
  declarations: [
    InicioComponent,
    AlumnoComponent,
    DocenteComponent,
    NoEncontradaComponent,
    IniciarSesionComponent,
    CerrarSesionComponent,
    RegistrarseComponent,
    AsistenciaComponent,
    MostrarQrComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CompartidoModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class PagesModule { }
