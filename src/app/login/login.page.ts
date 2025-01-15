import { Component } from '@angular/core';
import { UsuarioService } from '../api/usuario.service'; 
import { AlertController } from '@ionic/angular'; 
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user: any = {
    email: '',
    password: ''
  };

  constructor(
    private usuarioService: UsuarioService, 
    private alertCtrl: AlertController,
    private router: Router 
  ) {}

  // Lógica de inicio de sesión
  async login() {
    if (!this.user.email || !this.user.password) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, ingresa tu email y contraseña.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Llamar al servicio de usuario para validar credenciales
    this.usuarioService.loginUsuario(this.user).subscribe(
      async (res) => {
        console.log('Login exitoso', res);

        // Redirigir al HomePage con los datos del usuario
        let navigationExtras: NavigationExtras = {
          state: {
            user: this.user // Pasamos los datos del usuario aquí
          }
        };
        this.router.navigate(['/home'], navigationExtras); // Redirigir al home con los datos del usuario
      },
      async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Las credenciales no son correctas.',
          buttons: ['OK']
        });
        await alert.present();
        console.log('Error en el login', err);
      }
    );
  }
}
