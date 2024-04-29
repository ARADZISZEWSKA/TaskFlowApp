import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html'
})
export class NewTaskModalComponent {
  @Input()
  userId!: string;
  @Input()
  projectId!: string;
  taskName: string = '';
  description: string = '';
  deadline: string = '';

  constructor(
    private modalController: ModalController,
    private taskService: TaskService // Inject the TaskService
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  addTask() {
    const newTask: Task = {
      taskName: this.taskName,
      description: this.description,
      projectId: this.projectId,
      assignedUserId: this.userId,
      deadline: new Date(this.deadline),
      status: 'false'
    };

    this.taskService.addTask(newTask).subscribe({
      next: (res) => {
        if (res instanceof HttpResponse && res.ok) {
          console.log('Task added successfully:', res.body);
        } else {
          console.error('Unexpected response:', res);
        }
        this.dismissModal(); // Dismiss the modal in both cases
      },
      error: (err) => {
        console.error('Error adding task:', err);
        this.dismissModal(); // Dismiss the modal in case of error
      }
    });
    
    
    
  }
}
