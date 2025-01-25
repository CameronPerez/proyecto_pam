import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroGastosPageRoutingModule } from './registro-gastos-routing.module';

import { RegistroGastosPage } from './registro-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroGastosPageRoutingModule
  ],
  declarations: [RegistroGastosPage]
})
export class RegistroGastosPageModule {}
