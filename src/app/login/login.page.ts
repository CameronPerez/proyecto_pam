import { Component } from '@angular/core';
import { UsuarioService } from '../api/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { LocalStorageService } from '../api/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: any = {
    email: '',
    password: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  async login() {
    if (!this.user.email || !this.user.password) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, ingresa tu email y contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.usuarioService.loginUsuario(this.user).subscribe(
      async (res: any[]) => {
        if (res && res.length > 0) {
          const loggedInUser = res[0];
          console.log('Usuario encontrado:', loggedInUser);

          // Guardar datos del usuario en LocalStorage
          this.localStorageService.setItem('userName', loggedInUser.nombre);
          this.localStorageService.setItem('userEmail', loggedInUser.email);

          // Obtener presupuestos asociados al usuario
          this.usuarioService.obtenerPresupuestos(loggedInUser.email).subscribe(
            (presupuestos: any[]) => {
              console.log('Presupuestos cargados:', presupuestos);

              // Guardar los presupuestos en LocalStorage
              this.localStorageService.setItem('presupuestos', presupuestos);

              // Redirigir al Home
              let navigationExtras: NavigationExtras = {
                state: { user: loggedInUser.nombre },
              };
              this.router.navigate(['/home'], navigationExtras);
            },
            (err) => {
              console.error('Error al obtener los presupuestos:', err);
              this.mostrarAlerta('Error', 'No se pudieron cargar los presupuestos.');
            }
          );
        } else {
          this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
        }
      },
      async (err) => {
        console.error('Error al iniciar sesión:', err);
        this.mostrarAlerta(
          'Error',
          'Hubo un problema al iniciar sesión. Intenta más tarde.'
        );
      }
    );
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
