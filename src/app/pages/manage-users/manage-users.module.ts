import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

import { IonicModule } from '@ionic/angular';

import { ManageUsersPageRoutingModule } from './manage-users-routing.module';

import { ManageUsersPage } from './manage-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageUsersPageRoutingModule
  ],
  declarations: [ManageUsersPage, EditUserModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageUsersPageModule {}
