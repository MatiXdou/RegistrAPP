import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';

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
  private alertController = inject(AlertController);

  errorMessage: string = '';
  successMessage: string = '';
  registroFallido: boolean = false;


async validarUsuarioExistente(usuario: string): Promise<boolean> {
  try {
    const usuariosExistentes = await this.authService.analizaUsuario();
    return usuariosExistentes.some(u => u.user === usuario);
  } catch (error) {
    this.errorMessage = 'Error al validar el usuario';
    await this.mostrarAlerta('Error', 'Error al validar el usuario. Inténtalo de nuevo.');
    return true;
  }
}

async registrar() {
  this.errorMessage = '';
  this.successMessage = '';
  this.registroFallido = false;

  const usuarioExiste = await this.validarUsuarioExistente(this.usuario);

  if (usuarioExiste) {
    this.errorMessage = 'El nombre de usuario ya está en uso. Por favor, elige otro.';
    this.registroFallido = true;
    await this.mostrarAlerta('Error', this.errorMessage);
    return;
  }

  const nuevoUsuario = {
    user: this.usuario,
    pass: this.clave,
    name: this.nombreCompleto,
    phone: this.telefono,
    rol: this.rol
  };

  try {
    await this.authService.registrarNuevoUsuario(nuevoUsuario);
    this.successMessage = 'Usuario registrado exitosamente!';
    await this.mostrarAlerta('Éxito', this.successMessage);
    this.router.navigate(['/login']);
  } catch (error) {
    this.errorMessage = 'Hubo un error al registrar el usuario. Inténtalo de nuevo.';
    this.registroFallido = true;
    await this.mostrarAlerta('Error', this.errorMessage);
  }
}


async mostrarAlerta(header: string, message: string) {
  const alert = await this.alertController.create({
    header: header,
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}
}
