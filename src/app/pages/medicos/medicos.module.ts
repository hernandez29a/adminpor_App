import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicosPageRoutingModule } from './medicos-routing.module';

import { MedicosPage } from './medicos.page';
import { ComponentesModule } from '../../componentes/componentes.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicosPageRoutingModule,
    ComponentesModule,
    PipesModule
  ],
  declarations: [MedicosPage]
})
export class MedicosPageModule {}
