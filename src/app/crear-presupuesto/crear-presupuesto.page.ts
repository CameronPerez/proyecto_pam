import { Component } from '@angular/core';
import { LocalStorageService } from '../api/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.page.html',
  styleUrls: ['./crear-presupuesto.page.scss'],
})
export class CrearPresupuestoPage {
  presupuesto: any = {
    fechaInicio: '',
    fechaFin: '',
    gastos: [],
  };
  gasto: any = {
    monto: 0,
    fecha: '',
    descripcion: '',
    tipo: 'debito', // Débito por defecto
    cuotas: 1, // 1 cuota por defecto
  };
  esEdicion: boolean = false;
  presupuestoIndex: number | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    // Obtener datos si se está editando un presupuesto
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['presupuesto']) {
      this.presupuesto = navigation.extras.state['presupuesto'];
      this.presupuestoIndex = navigation.extras.state['index'];
      this.esEdicion = true;
      console.log('Editando presupuesto:', this.presupuesto);
    }
  }

  guardarPresupuesto() {
    // Obtener la lista actual de presupuestos desde LocalStorage
    const presupuestos = this.localStorageService.getItem('presupuestos') || [];

    if (this.esEdicion && this.presupuestoIndex !== null) {
      // Actualizar el presupuesto existente
      presupuestos[this.presupuestoIndex] = this.presupuesto;
    } else {
      // Agregar el nuevo presupuesto a la lista
      presupuestos.push({ ...this.presupuesto, id: Date.now() });
    }

    // Guardar la lista actualizada en LocalStorage
    this.localStorageService.setItem('presupuestos', presupuestos);

    console.log('Presupuesto guardado:', this.presupuesto);

    // Redirigir al Home
    this.router.navigate(['/home']);
  }

  agregarGasto() {
    if (this.gasto.tipo === 'debito') {
      // Registro único para Débito
      const nuevoGasto = { ...this.gasto, id: Date.now() };
      this.presupuesto.gastos.push(nuevoGasto);
    } else if (this.gasto.tipo === 'credito') {
      // Generar múltiples cobros para Crédito
      const fechaBase = new Date(this.gasto.fecha);
      const montoPorCuota = this.gasto.monto / this.gasto.cuotas;

      for (let i = 0; i < this.gasto.cuotas; i++) {
        const nuevaFecha = new Date(fechaBase);
        nuevaFecha.setMonth(fechaBase.getMonth() + i); // Avanzar un mes por cuota

        const nuevoGasto = {
          ...this.gasto,
          id: Date.now() + i,
          fecha: nuevaFecha.toISOString().split('T')[0],
          monto: montoPorCuota,
        };

        this.presupuesto.gastos.push(nuevoGasto);
      }
    }

    console.log('Gasto agregado:', this.gasto);

    // Reiniciar el formulario de gastos
    this.gasto = {
      monto: 0,
      fecha: '',
      descripcion: '',
      tipo: 'debito',
      cuotas: 1,
    };
  }
}
