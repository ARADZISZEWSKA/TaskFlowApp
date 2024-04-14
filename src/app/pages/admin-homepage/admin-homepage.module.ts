import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomepagePageRoutingModule } from './admin-homepage-routing.module';

import { AdminHomepagePage } from './admin-homepage.page';
import { IonModal } from '@ionic/angular/common';
import { AddProjectModalComponent } from './modals/add-project-modal/add-project-modal.component';
import { TypeaheadModule } from 'src/app/components/typeahead/typeahead.module';
import { RegisterUserModalComponent } from './modals/register-user-modal/register-user-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomepagePageRoutingModule,
    TypeaheadModule
  ],
  declarations: [AdminHomepagePage, AddProjectModalComponent, RegisterUserModalComponent]  
})



export class AdminHomepagePageModule {
}
