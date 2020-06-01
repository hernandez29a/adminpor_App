import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalesPage } from './hospitales.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalesPageRoutingModule {}
