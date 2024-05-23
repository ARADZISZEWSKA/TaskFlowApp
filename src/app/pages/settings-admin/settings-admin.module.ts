import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChangeAdminPasswordModalComponent } from './change-admin-password-modal/change-admin-password-modal.component'; // Upewnij się, że komponent jest importowany

import { SettingsAdminPageRoutingModule } from './settings-admin-routing.module';

import { SettingsAdminPage } from './settings-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsAdminPageRoutingModule
  ],
  declarations: [SettingsAdminPage, ChangeAdminPasswordModalComponent]
})
export class SettingsAdminPageModule {}
