import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitalesPageRoutingModule } from './hospitales-routing.module';

import { HospitalesPage } from './hospitales.page';
import { ComponentesModule } from '../../componentes/componentes.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HospitalesPageRoutingModule,
    ComponentesModule,
    PipesModule
  ],
  declarations: [HospitalesPage]
})
export class HospitalesPageModule {}
