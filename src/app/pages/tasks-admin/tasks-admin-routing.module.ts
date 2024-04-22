import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksAdminPage } from './tasks-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TasksAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksAdminPageRoutingModule {}
