import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AdminGuard } from '../../guards/admin.guard';
import { VerificaTokenGuard } from '../../guards/verifica-token.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        canActivate: [VerificaTokenGuard],
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        canActivate: [AdminGuard],
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'hospitales',
        loadChildren: () => import('../hospitales/hospitales.module').then( m => m.HospitalesPageModule)
      },
      {
        path: 'medicos',
        loadChildren: () => import('../medicos/medicos.module').then( m => m.MedicosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
