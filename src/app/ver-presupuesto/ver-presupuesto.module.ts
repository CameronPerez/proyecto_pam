import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerPresupuestoPageRoutingModule } from './ver-presupuesto-routing.module';

import { VerPresupuestoPage } from './ver-presupuesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerPresupuestoPageRoutingModule
  ],
  declarations: [VerPresupuestoPage]
})
export class VerPresupuestoPageModule {}
