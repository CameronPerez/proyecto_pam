import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPresupuestoPage } from './crear-presupuesto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPresupuestoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPresupuestoPageRoutingModule {}
