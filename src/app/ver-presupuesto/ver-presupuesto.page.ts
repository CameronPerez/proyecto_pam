import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../api/usuario.service';
import { AlertController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-ver-presupuesto',
  templateUrl: './ver-presupuesto.page.html',
  styleUrls: ['./ver-presupuesto.page.scss'],
})
export class VerPresupuestoPage implements OnInit, AfterViewInit {
  presupuesto: any = null;
  categorias: any[] = [];
  nuevoGasto: any = {
    descripcion: '',
    monto: 0,
    categoriaId: '',
  };
  nuevaCategoria: any = {
    nombre: '',
  };
  mostrarNuevaCategoria = false;
  chart: any;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['presupuesto']) {
      this.presupuesto = JSON.parse(
        JSON.stringify(navigation.extras.state['presupuesto'])
      ); // Clonando para evitar referencias persistentes
    } else {
      console.error('No se encontró un presupuesto para mostrar.');
    }
    this.cargarCategorias();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.generarGrafico();
    }, 500);
  }

  cargarCategorias() {
    this.usuarioService.obtenerCategorias().subscribe(
      (categorias: any[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  verificarCategoria(event: any) {
    this.mostrarNuevaCategoria = event.detail.value === 'nueva';
  }

  async agregarGasto() {
    if (this.mostrarNuevaCategoria && this.nuevaCategoria.nombre.trim()) {
      const nuevaCategoria = { id: Date.now().toString(), nombre: this.nuevaCategoria.nombre };
      this.usuarioService.crearCategoria(nuevaCategoria).subscribe(
        (categoriaCreada) => {
          this.categorias.push(categoriaCreada);
          this.nuevoGasto.categoriaId = categoriaCreada.id;
          this.nuevaCategoria.nombre = '';
          this.mostrarNuevaCategoria = false;

          this.agregarGastoPresupuesto();
        },
        (error) => {
          console.error('Error al crear la categoría:', error);
        }
      );
    } else {
      this.agregarGastoPresupuesto();
    }
  }

  agregarGastoPresupuesto() {
    const gasto = { ...this.nuevoGasto, id: Date.now().toString() };
    this.presupuesto.gastos.push(gasto);
    this.nuevoGasto = { descripcion: '', monto: 0, categoriaId: '' };

    this.usuarioService.actualizarPresupuesto(this.presupuesto).subscribe(
      async () => {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Gasto agregado correctamente.',
          buttons: ['OK'],
        });
        await alert.present();
        this.generarGrafico();
      },
      (error) => {
        console.error('Error al agregar el gasto:', error);
      }
    );
  }

  async confirmarEliminacionGasto(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este gasto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarGasto(index);
          },
        },
      ],
    });
    await alert.present();
  }

  eliminarGasto(index: number) {
    this.presupuesto.gastos.splice(index, 1);
    this.usuarioService.actualizarPresupuesto(this.presupuesto).subscribe(
      async () => {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Gasto eliminado correctamente.',
          buttons: ['OK'],
        });
        await alert.present();
        this.generarGrafico();
      },
      (error) => {
        console.error('Error al eliminar el gasto:', error);
      }
    );
  }

  obtenerNombreCategoria(categoriaId: string) {
    const categoria = this.categorias.find((c) => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  guardarCambios() {
    this.usuarioService.actualizarPresupuesto(this.presupuesto).subscribe(
      async () => {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Los cambios se guardaron correctamente.',
          buttons: ['OK'],
        });
        await alert.present();
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudieron guardar los cambios. Intenta de nuevo.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  volver() {
    this.router.navigate(['/home']);
  }

  generarGrafico() {
    if (!this.presupuesto || !this.presupuesto.gastos) {
      console.warn('No hay datos para generar el gráfico.');
      return;
    }

    const categoriasGasto: { [key: string]: number } = {};

    this.presupuesto.gastos.forEach((gasto: any) => {
      if (categoriasGasto[gasto.categoriaId]) {
        categoriasGasto[gasto.categoriaId] += gasto.monto;
      } else {
        categoriasGasto[gasto.categoriaId] = gasto.monto;
      }
    });

    const labels = Object.keys(categoriasGasto).map((id) =>
      this.obtenerNombreCategoria(id)
    );
    const data = Object.values(categoriasGasto);

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('gastosChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('No se encontró el elemento canvas para el gráfico.');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
}
