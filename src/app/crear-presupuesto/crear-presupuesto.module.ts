import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CrearPresupuestoPageRoutingModule } from './crear-presupuesto-routing.module';
import { CrearPresupuestoPage } from './crear-presupuesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPresupuestoPageRoutingModule,
  ],
  declarations: [CrearPresupuestoPage],
})
export class CrearPresupuestoPageModule {}
