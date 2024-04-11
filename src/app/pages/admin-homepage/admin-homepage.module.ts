import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomepagePageRoutingModule } from './admin-homepage-routing.module';

import { AdminHomepagePage } from './admin-homepage.page';
import { IonModal } from '@ionic/angular/common';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomepagePageRoutingModule,
    
  ],
  declarations: [AdminHomepagePage, AddProjectModalComponent]  
})



export class AdminHomepagePageModule {
}
