import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/guards/admin.guard';
import { TasksAdminPage } from './tasks-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TasksAdminPage,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksAdminPageRoutingModule {}
