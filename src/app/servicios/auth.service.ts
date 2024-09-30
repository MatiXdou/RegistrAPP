import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usuariosSimulados } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<string>('');
  usuario$ = this.usuarioSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();



  buscarBD2(usuario: string, clave: string): void { // Simulación de la autenticación con base en datos fijas
    const usuarioEncontrado = usuariosSimulados.find( // Buscar un usuario en la lista de usuarios simulados
      u => u.usuario === usuario && u.clave === clave // Revisar si el usuario y la clave coinciden con los datos de un usuario
    );

    if (usuarioEncontrado) { // Si el usuario y la clave coinciden con los datos de un usuario, activar
      this.isAuthenticatedSubject.next(true); // Activar el estado de autenticación si la autenticación es correcta.
      this.usuarioSubject.next(usuarioEncontrado.nombreCompleto); // Actualizar el nombre completo del usuario autenticado.
      this.loginFailedSubject.next(false);  // Restablecer loginFailed a false
    } else {
      this.isAuthenticatedSubject.next(false); // Desactivar el estado de autenticación si la autenticación es incorrecta.
      this.loginFailedSubject.next(true);  // Establecer loginFailed a true si falla la autenticación
    }
  }

  logout(): void {
    this.usuarioSubject.next('');
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
  }

  isLoggedIn(){
    return this.isAuthenticated$;
  }

}
