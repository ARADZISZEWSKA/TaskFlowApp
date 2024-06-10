import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { HttpResponse } from '@angular/common/http';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html'
})
export class NewTaskModalComponent {
  @Input() userId!: string;
  @Input() projectId!: string;
  @Input() onModalDismiss!: () => void; // Callback to be called on dismiss

  taskName: string = '';
  description: string = '';
  deadline: string = '';

  constructor(
    private modalController: ModalController,
    private taskService: TaskService
  ) {}

  async hapticsImpactMedium() {
    await Haptics.impact({ style: ImpactStyle.Medium });
  }

  async hapticsImpactLight() {
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  async hapticsVibrate() {
    await Haptics.vibrate();
  }

  async hapticsSelectionStart() {
    await Haptics.selectionStart();
  }

  async hapticsSelectionChanged() {
    await Haptics.selectionChanged();
  }

  async hapticsSelectionEnd() {
    await Haptics.selectionEnd();
  }

  dismissModal() {
    this.modalController.dismiss();
    this.onModalDismiss(); // Call the callback function when the modal is dismissed
  }

  async addTask() {
    const newTask: Task = {
      taskName: this.taskName,
      description: this.description,
      projectId: this.projectId,
      assignedUserId: this.userId,
      deadline: new Date(this.deadline),
      status: 'false'
    };

    try {
      const res = await this.taskService.addTask(newTask).toPromise();
      if (res instanceof HttpResponse) {
        console.log('Task added successfully:', res.body);
        await this.hapticsImpactMedium(); // Trigger haptics feedback on successful task addition
      } else {
        console.error('Unexpected response:', res);
        await this.hapticsImpactLight(); // Trigger haptics feedback on unexpected response
      }
    } catch (err) {
      console.error('Error adding task:', err);
      await this.hapticsImpactLight(); // Trigger haptics feedback on error
    } finally {
      this.dismissModal(); // Dismiss the modal in both cases
    }
  }
}
