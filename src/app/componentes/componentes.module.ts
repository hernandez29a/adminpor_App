import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario/detalle-usuario.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetalleHospitalComponent } from './hospital/detalle-hospital/detalle-hospital.component';



@NgModule({
  entryComponents:[
    DetalleUsuarioComponent,
    DetalleHospitalComponent
  ],
  declarations: [
    HeaderComponent,
    DetalleUsuarioComponent,
    DetalleHospitalComponent
  ],
  exports:[
    HeaderComponent,
    DetalleUsuarioComponent,
    DetalleHospitalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentesModule { }
