import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCategoriasPageRoutingModule } from './registro-categorias-routing.module';

import { RegistroCategoriasPage } from './registro-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCategoriasPageRoutingModule
  ],
  declarations: [RegistroCategoriasPage]
})
export class RegistroCategoriasPageModule {}
