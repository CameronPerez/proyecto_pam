import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroGastosPage } from './registro-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroGastosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroGastosPageRoutingModule {}
