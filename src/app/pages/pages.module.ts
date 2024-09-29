import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    AlumnoComponent,
    NotFoundComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    IonicModule,
    FormsModule,
  ]
})
export class PagesModule { }
