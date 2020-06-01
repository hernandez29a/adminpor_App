import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario/detalle-usuario.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetalleHospitalComponent } from './hospital/detalle-hospital/detalle-hospital.component';
import { HospitalCrearComponent } from './hospital/hospital-crear/hospital-crear.component';
import { HospitalActualizarComponent } from './hospital/hospital-actualizar/hospital-actualizar.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  entryComponents:[
    DetalleUsuarioComponent,
    DetalleHospitalComponent,
    HospitalCrearComponent,
    HospitalActualizarComponent
    
  ],
  declarations: [
    HeaderComponent,
    DetalleUsuarioComponent,
    DetalleHospitalComponent,
    HospitalCrearComponent,
    HospitalActualizarComponent
    
  ],
  exports:[
    HeaderComponent,
    DetalleUsuarioComponent,
    DetalleHospitalComponent,
    HospitalCrearComponent,
    HospitalActualizarComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ]
})
export class ComponentesModule { }
