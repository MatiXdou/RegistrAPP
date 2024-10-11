import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {

  usuario: string = '';
  clave: string = '';
  nombreCompleto: string = '';
  telefono: string = '';
  rol: string = 'alumno';

  private authService = inject(AuthService);
  private router = inject(Router);

  registroFallido: boolean = false;

  async registrar() {
    const nuevoUsuario = {
      user: this.usuario,
      pass: this.clave,
      name: this.nombreCompleto,
      phone: this.telefono,
      rol: this.rol
    };

    try {
      await this.authService.registrarNuevoUsuario(nuevoUsuario);
      this.usuario = '';
      this.clave = '';
      this.nombreCompleto = '';
      this.telefono = ''
      this.rol = 'alumno';
      this.router.navigate(['/login']);
    } catch (error) {
      this.registroFallido = true;
    }
  }
}
