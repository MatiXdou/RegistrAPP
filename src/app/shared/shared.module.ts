import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
