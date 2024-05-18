import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ProjectDetailsHomeModalComponent } from './modals/project-details-home-modal/project-details-home-modal.component';




import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, IonicModule, SwiperModule],
  declarations: [HomePage, ProjectDetailsHomeModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}