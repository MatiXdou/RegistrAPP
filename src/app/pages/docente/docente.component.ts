import { Component, OnInit, ViewChild, OnDestroy, ElementRef, inject } from '@angular/core';
import QRious from 'qrious';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss'],
})
export class DocenteComponent  implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  usuario: string;
  subscriptionAuthService: Subscription;

  asignaturas = [
    { nombre: 'Programación en Python', id: 'INF101' },
    { nombre: 'Bases de Datos', id: 'INF102' },
    { nombre: 'Algoritmos y Estructuras de Datos', id: 'INF103' },
  ];

  qrData: string = '';
  showQRCode: boolean = false;

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  generarQR(asignaturaId: string) {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const día = String(fechaActual.getDate()).padStart(2, '0');
    const horas = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');

    const fechaHora = `${año}-${mes}-${día},${horas}:${minutos}:${segundos}`;
    this.qrData = `http://localhost:8100/asistencia/${asignaturaId}/${this.usuario}/${fechaHora}`;

    this.showQRCode = true;
    this.createQR();
  }

  createQR() {
    const qr = new QRious({
      element: this.qrCanvas.nativeElement,
      value: this.qrData,
      size: 256,
      level: 'M'
    });
  }

  constructor() { }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario
      console.log('Docente:', usuario);
    });
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe();
  }

}
