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
import { DetalleMedicoComponent } from './medico/detalle-medico/detalle-medico.component';
import { MedicoCrearComponent } from './medico/medico-crear/medico-crear.component';
import { MedicoActualizarComponent } from './medico/medico-actualizar/medico-actualizar.component';




@NgModule({
  entryComponents:[
    DetalleUsuarioComponent,
    HospitalCrearComponent,
    HospitalActualizarComponent,
    DetalleHospitalComponent,
    MedicoCrearComponent,
    MedicoActualizarComponent,
    DetalleMedicoComponent
    
  ],
  declarations: [
    HeaderComponent,
    DetalleUsuarioComponent,
    DetalleHospitalComponent,
    HospitalCrearComponent,
    HospitalActualizarComponent,
    DetalleMedicoComponent,
    MedicoCrearComponent,
    MedicoActualizarComponent
    
  ],
  exports:[
    HeaderComponent,
    DetalleUsuarioComponent,
    DetalleHospitalComponent,
    HospitalCrearComponent,
    HospitalActualizarComponent,
    MedicoCrearComponent,
    MedicoActualizarComponent,
    DetalleMedicoComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ]
})
export class ComponentesModule { }
