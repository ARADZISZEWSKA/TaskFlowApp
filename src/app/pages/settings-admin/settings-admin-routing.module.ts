import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsAdminPage } from './settings-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsAdminPageRoutingModule {}
