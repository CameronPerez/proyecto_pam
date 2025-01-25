import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../api/local-storage.service';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../api/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userName: string = ''; // Nombre del usuario
  userEmail: string = ''; // Email del usuario
  presupuestos: any[] = []; // Lista de presupuestos creados por el usuario
  presupuestosCompartidos: any[] = []; // Lista de presupuestos compartidos

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private alertCtrl: AlertController,
    private usuarioService: UsuarioService
  ) {}

  ionViewWillEnter() {
    try {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state?.['user']) {
        this.userName = navigation.extras.state['user'];
        this.userEmail = this.localStorageService.getItem('userEmail');
      } else {
        this.userName = this.localStorageService.getItem('userName') || 'Usuario';
        this.userEmail = this.localStorageService.getItem('userEmail') || '';
      }

      if (this.userEmail) {
        this.cargarPresupuestos();
        this.cargarPresupuestosCompartidos();
      }
    } catch (error) {
      console.error('Error al cargar la información en Home:', error);
    }
  }

  cargarPresupuestos() {
    this.usuarioService.obtenerPresupuestos(this.userEmail).subscribe(
      (presupuestos: any[]) => {
        this.presupuestos = presupuestos.filter((p) => p.usuarioEmail === this.userEmail);
        console.log('Presupuestos cargados del servidor:', this.presupuestos);
      },
      (error) => {
        console.error('Error al cargar los presupuestos:', error);
      }
    );
  }

  cargarPresupuestosCompartidos() {
    this.usuarioService.obtenerPresupuestosCompartidos(this.userEmail).subscribe(
      (presupuestos: any[]) => {
        // Filtrar presupuestos para asegurarse de que realmente están compartidos con el usuario actual
        this.presupuestosCompartidos = presupuestos.filter((p) =>
          p.compartidoCon?.includes(this.userEmail)
        );
        console.log('Presupuestos compartidos cargados:', this.presupuestosCompartidos);
      },
      (error) => {
        console.error('Error al cargar los presupuestos compartidos:', error);
      }
    );
  }

  cerrarSesion() {
    this.localStorageService.removeItem('userName');
    this.localStorageService.removeItem('userEmail');
    this.localStorageService.removeItem('presupuestos');
    this.router.navigate(['/login']);
    console.log('Sesión cerrada y datos eliminados.');
  }

  verPresupuesto(index: number) {
    const presupuesto = this.presupuestos[index];
    this.router.navigate(['/ver-presupuesto'], { state: { presupuesto } });
  }

  verPresupuestoCompartido(index: number) {
    const presupuesto = this.presupuestosCompartidos[index];
    this.router.navigate(['/ver-presupuesto'], { state: { presupuesto } });
  }

  crearPresupuesto() {
    const nombrePresupuesto = `Presupuesto ${this.presupuestos.length + 1}`;
    const nuevoPresupuesto = {
      id: Date.now().toString(), // Generar un ID único como cadena
      nombre: nombrePresupuesto,
      usuarioEmail: this.userEmail,
      gastos: [],
      compartidoCon: [],
    };

    this.usuarioService.guardarPresupuesto(nuevoPresupuesto).subscribe(
      (presupuestoGuardado) => {
        this.presupuestos.push(presupuestoGuardado);
        console.log('Presupuesto creado y guardado en el servidor:', presupuestoGuardado);
      },
      (error) => {
        console.error('Error al guardar el presupuesto:', error);
      }
    );
  }

  async compartirPresupuesto(index: number) {
    const presupuesto = this.presupuestos[index];

    const alert = await this.alertCtrl.create({
      header: 'Compartir Presupuesto',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo del usuario',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Compartir',
          handler: (data) => {
            if (data.email) {
              this.usuarioService.compartirPresupuesto(presupuesto, data.email).subscribe(
                async () => {
                  const successAlert = await this.alertCtrl.create({
                    header: 'Éxito',
                    message: `El presupuesto "${presupuesto.nombre}" fue compartido con ${data.email}.`,
                    buttons: ['OK'],
                  });
                  await successAlert.present();
                },
                async (error) => {
                  const errorAlert = await this.alertCtrl.create({
                    header: 'Error',
                    message: 'No se pudo compartir el presupuesto. Intenta de nuevo.',
                    buttons: ['OK'],
                  });
                  await errorAlert.present();
                }
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmarEliminacion(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este presupuesto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarPresupuesto(index);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarPresupuesto(index: number) {
    const presupuesto = this.presupuestos[index];

    this.usuarioService.eliminarPresupuesto(presupuesto.id).subscribe(
      () => {
        this.presupuestos.splice(index, 1); // Eliminar del array en memoria
        console.log('Presupuesto eliminado del servidor:', presupuesto);
      },
      (error) => {
        console.error('Error al eliminar el presupuesto:', error);
      }
    );
  }
}
