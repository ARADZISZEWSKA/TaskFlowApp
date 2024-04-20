import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsAdminPageRoutingModule } from './settings-admin-routing.module';

import { SettingsAdminPage } from './settings-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsAdminPageRoutingModule
  ],
  declarations: [SettingsAdminPage]
})
export class SettingsAdminPageModule {}
