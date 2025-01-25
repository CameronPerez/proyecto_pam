import { Component } from '@angular/core';
import { LocalStorageService } from '../api/local-storage.service';

@Component({
  selector: 'app-registro-categorias',
  templateUrl: './registro-categorias.page.html',
  styleUrls: ['./registro-categorias.page.scss'],
})
export class RegistroCategoriasPage {
  categoria: string = '';
  categorias: any[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.categorias = this.localStorageService.getItem('categorias') || [];
  }

  agregarCategoria() {
    const nuevaCategoria = { id: Date.now(), nombre: this.categoria };
    this.categorias.push(nuevaCategoria);
    this.localStorageService.setItem('categorias', this.categorias);
    this.categoria = '';
    console.log('Categorías actualizadas:', this.categorias);
  }
}
