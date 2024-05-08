import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../guards/admin.guard'; // Ścieżka względna do pliku admin.guard


import { AdminHomepagePage } from './admin-homepage.page';
import { ModalController } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: AdminHomepagePage,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomepagePageRoutingModule {}
