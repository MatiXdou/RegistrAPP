import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  usuario: string ='';
  clave: string ='';

  private authService = inject(AuthService);
  private router = inject(Router);

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();
  loginFailed: boolean;

  ngOnInit(): void {
    this.authService.loginFailed$.subscribe(loginFailed => this.loginFailed = loginFailed);
  }

  constructor() { }

  login(usuario: string, clave: string): void {
    this.authService.buscarBD2(usuario, clave);

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.usuario = '';
        this.clave = '';
        this.router.navigate(['/home']);
      } else {
        this.loginFailed = true;
      }
    });
  }

}
