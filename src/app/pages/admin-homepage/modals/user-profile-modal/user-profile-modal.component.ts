import { Component, Input, OnInit } from '@angular/core';
import { ModalController, createAnimation } from '@ionic/angular';
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss'],
})
export class UserProfileModalComponent implements OnInit {
  @Input() user: any;
  @Input() projectId!: string;
  @Input() overdueTasks: any[] = [];
  @Input() onModalDismiss!: () => void; // Callback to be called on dismiss
  toDoTasks: any[] = [];
  tasks: Task[] = [];

  constructor(
    private modalController: ModalController,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.loadTasks(this.user.id, this.projectId); // Initial task load
  }

  playCheckboxAnimation(event: any, task: Task): void {
    console.log(event);
    const newStatus = task.status === 'completed' ? 'not completed' : 'completed';
    this.taskService.updateTaskStatus(task.id!, newStatus).subscribe({
      next: () => {
        task.status = newStatus; // Update local task model
        createAnimation('')
          .addElement(event.srcElement)
          .easing('cubic-bezier(0, 0.55, 0.45, 1)')
          .duration(500)
          .fromTo('transform', 'rotate(0)', 'rotate(360deg)').play();
      },
      error: (error) => console.error('Failed to update task status:', error)
    });
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
    this.onModalDismiss(); // Call the callback function when the modal is dismissed
  }

  async openNewTaskModal() {
    const modal = await this.modalController.create({
      component: NewTaskModalComponent,
      componentProps: {
        userId: this.user.id,
        projectId: this.projectId,
        onModalDismiss: () => this.loadTasks(this.user.id, this.projectId) // Pass the callback function
      }
    });

    return await modal.present();
  }

  loadTasks(userId: string, projectId: string) {
    this.taskService.getTasksByUserAndProject(userId, projectId).subscribe({
      next: (tasks) => {
        console.log('Tasks:', tasks); // Log received tasks
        
        // Clear existing tasks
        this.overdueTasks = [];
        this.toDoTasks = [];

        // Loop through tasks and add them to appropriate arrays
        tasks.forEach(task => {
          if (this.isTaskOverdue(task)) {
            // If task is overdue, add it to overdueTasks
            this.overdueTasks.push(task);
          }
          // Add all tasks to toDoTasks regardless of whether they are overdue or not
          this.toDoTasks.push(task);
        });
        
        console.log('ToDo Tasks:', this.toDoTasks); // Log tasks to do
        console.log('Overdue Tasks:', this.overdueTasks); // Log overdue tasks
      },
      error: (err) => {
        console.error('Error retrieving tasks:', err);
      }
    });
  }

  isTaskOverdue(task: any): boolean {
    const deadlineDate = new Date(task.deadline);
    const currentDate = new Date();
    return deadlineDate < currentDate; // The task is overdue if the deadline is earlier than the current date
  }
}
