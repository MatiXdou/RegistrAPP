import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebService } from './web.service';
import { UsuarioAPI } from '../models/usuarioAPI.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<string>('');
  usuario$ = this.usuarioSubject.asObservable();

  private usuarioCompletoSubject = new BehaviorSubject<UsuarioAPI>(null);
  usuarioCompleto$ = this.usuarioCompletoSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();


  webservice = inject(WebService);
  async buscarBD4(usuario: string, clave: string){
    const url = 'https://670e7cbc3e7151861654bdf5.mockapi.io/'
    const res = await this.webservice.request('GET', url, 'users') as Array<UsuarioAPI>;

    const user = res.find(u => u.user === usuario && u.pass === clave);
    if (user) {
      console.log('Autenticación exitosa!');
      console.log(user);
      this.isAuthenticatedSubject.next(true);
      this.usuarioSubject.next(user.name);
      this.usuarioCompletoSubject.next(user);
      this.loginFailedSubject.next(false);
    } else {
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
    }
  }


async registrarNuevoUsuario(usuario: any) {
  const url = 'https://670e7cbc3e7151861654bdf5.mockapi.io/';
  try {
    const revisaUsuarios = await this.analizaUsuario();
    const usuarioExiste = revisaUsuarios.find(u => u.user === usuario.user);

    if (usuarioExiste) {
      throw new Error('El usuario ya está registrado, intenta con otro.');
    }

    const res = await this.webservice.request('POST', url, 'users', usuario);
    console.log('Usuario registrado con éxito', res);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
}

async analizaUsuario(): Promise<UsuarioAPI[]> {
  const url = 'https://670e7cbc3e7151861654bdf5.mockapi.io/';
  try {
    const res = await this.webservice.request('GET', url, 'users') as Array<UsuarioAPI>;
    return res;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}


  logout(): void {
    this.usuarioSubject.next('');
    this.usuarioCompletoSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
  }

  isLoggedIn(){
    return this.isAuthenticated$;
  }

}
