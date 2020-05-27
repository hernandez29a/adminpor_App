import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario/detalle-usuario.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  entryComponents:[
    DetalleUsuarioComponent
  ],
  declarations: [
    HeaderComponent,
    DetalleUsuarioComponent
  ],
  exports:[
    HeaderComponent,
    DetalleUsuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentesModule { }
