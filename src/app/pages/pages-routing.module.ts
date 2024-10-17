import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { redirectIfAuthGuard } from '../guard/redirect-if-auth.guard';
import { authGuard } from '../guard/auth.guard';
import { RegistrarComponent } from './registrar/registrar.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { DocenteComponent } from './docente/docente.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'login', component: LoginComponent, canActivate: [redirectIfAuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'alumno', component: AlumnoComponent, canActivate: [authGuard] },
  { path: 'docente', component: DocenteComponent, canActivate: [authGuard] },
  { path: 'asistencia/:codigo/:usuario/:fecha', component: AsistenciaComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
