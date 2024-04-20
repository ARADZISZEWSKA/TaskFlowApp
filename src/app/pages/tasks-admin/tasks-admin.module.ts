import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksAdminPageRoutingModule } from './tasks-admin-routing.module';

import { TasksAdminPage } from './tasks-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksAdminPageRoutingModule
  ],
  declarations: [TasksAdminPage]
})
export class TasksAdminPageModule {}
