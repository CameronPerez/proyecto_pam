import { Component } from '@angular/core';
import { LocalStorageService } from '../api/local-storage.service';

@Component({
  selector: 'app-registro-gastos',
  templateUrl: './registro-gastos.page.html',
  styleUrls: ['./registro-gastos.page.scss'],
})
export class RegistroGastosPage {
  gasto: any = {
    categoriaId: null,
    monto: 0,
    fecha: '',
    descripcion: '',
    tipo: 'debito', // Por defecto es Débito
    cuotas: 1, // Por defecto, 1 cuota para Débito
  };
  categorias: any[] = [];
  gastos: any[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.categorias = this.localStorageService.getItem('categorias') || [];
    this.gastos = this.localStorageService.getItem('gastos') || [];
  }

  agregarGasto() {
    if (this.gasto.tipo === 'debito') {
      // Registro único para Débito
      const nuevoGasto = { ...this.gasto, id: Date.now() };
      this.gastos.push(nuevoGasto);
    } else if (this.gasto.tipo === 'credito') {
      // Generar múltiples cobros para Crédito
      const fechaBase = new Date(this.gasto.fecha);
      const montoPorCuota = this.gasto.monto / this.gasto.cuotas;

      for (let i = 0; i < this.gasto.cuotas; i++) {
        const nuevaFecha = new Date(fechaBase);
        nuevaFecha.setMonth(fechaBase.getMonth() + i); // Avanzar un mes por cuota

        const nuevoGasto = {
          ...this.gasto,
          id: Date.now() + i, // ID único para cada cuota
          fecha: nuevaFecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
          monto: montoPorCuota,
        };

        this.gastos.push(nuevoGasto);
      }
    }

    // Guardar en LocalStorage
    this.localStorageService.setItem('gastos', this.gastos);

    // Reiniciar el formulario
    this.gasto = {
      categoriaId: null,
      monto: 0,
      fecha: '',
      descripcion: '',
      tipo: 'debito',
      cuotas: 1,
    };

    console.log('Gastos actualizados:', this.gastos);
  }
}
