import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomepagePage } from './admin-homepage.page';

const routes: Routes = [
  {
    path: '',
    component: AdminHomepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomepagePageRoutingModule {}
