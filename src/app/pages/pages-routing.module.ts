import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
