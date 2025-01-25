import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCategoriasPage } from './registro-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCategoriasPageRoutingModule {}
