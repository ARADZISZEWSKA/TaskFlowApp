import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomepagePageRoutingModule } from './admin-homepage-routing.module';

import { AdminHomepagePage } from './admin-homepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomepagePageRoutingModule
  ],
  declarations: [AdminHomepagePage]
})
export class AdminHomepagePageModule {}
