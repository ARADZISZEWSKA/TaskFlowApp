import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component';
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss'],
})
export class UserProfileModalComponent implements OnInit {
  @Input() user: any;
  @Input() projectId!: string; 
  @Input() overdueTasks: any[] = []; // Przeterminowane zadania
  toDoTasks: any[] = [];
  

  constructor(
    private modalController: ModalController,
    private taskService: TaskService // Inject TaskService here
  ) {}

  ngOnInit() {
    this.loadTasks(this.user.id, this.projectId);
  }

 

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
    return deadlineDate < currentDate; // Zadanie jest przeterminowane, jeśli deadline jest wcześniejszy niż bieżąca data
  }
}
