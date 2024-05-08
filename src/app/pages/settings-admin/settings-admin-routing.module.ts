import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../guards/admin.guard'; 
import { SettingsAdminPage } from './settings-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsAdminPage,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsAdminPageRoutingModule {}
