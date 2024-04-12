import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';


@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.page.html',
  styleUrls: ['./admin-homepage.page.scss'],
})
export class AdminHomepagePage implements OnInit {

  constructor(private modalController: ModalController) {}

  async openAddProjectModal() {
    const modal = await this.modalController.create({
      component: AddProjectModalComponent,
      // componentProps: { ... } // Optional: if you need to pass data to the modal
    });

    return await modal.present();
  }
  
  

  ngOnInit() {
  }

}
