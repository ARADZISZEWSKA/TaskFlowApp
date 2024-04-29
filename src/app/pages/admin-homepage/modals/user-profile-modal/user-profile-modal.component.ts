import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss'],
})
export class UserProfileModalComponent {
  @Input() user: any;
  @Input()
  projectId!: string; 

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  async openNewTaskModal() {
    const modal = await this.modalController.create({
      component: NewTaskModalComponent,
      componentProps: {
        userId: this.user.id,
        projectId: this.projectId  
      }
    });
    return await modal.present();
  }
}
