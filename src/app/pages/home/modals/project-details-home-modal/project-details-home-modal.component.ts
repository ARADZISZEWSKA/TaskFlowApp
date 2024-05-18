import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/projects.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ModalController, createAnimation } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-project-details-home-modal',
  templateUrl: './project-details-home-modal.component.html',
  styleUrls: ['./project-details-home-modal.component.scss'],
})
export class ProjectDetailsHomeModalComponent  implements OnInit {

  tasks: Task[] = [];
  @Input() user: any;
  @Input() projectId!: string; 
  toDoTasks: any[] = [];
  @Input() project!: Project;
  

  constructor(
    private projectService: ProjectService,
    private modalController: ModalController,
    private toastController: ToastController,
    private taskService: TaskService
  ) {}

  async ngOnInit() {
    this.archiveAndDeleteCompletedTasks();
    this.loadTasks(this.user.id, this.projectId);
  }
  

  archiveAndDeleteCompletedTasks() {
    this.taskService.archiveAndDeleteCompletedTasks().subscribe({
      next: (response) => {
        // Assuming response is already a JavaScript object
        if (response.success) {
          console.log('Tasks deleted succesfully');
        } else {
          console.error('API succeeded but indicated failure:', response.message);
        }
      },
      error: (error) => {
        // Log the error response to understand the issue better
        console.error('Failed to archive and delete tasks:', error.error);
      }
    });
  }

  loadTasks(userId: string, projectId: string) {
    this.taskService.getTasksByUserAndProject(userId, projectId).subscribe({
      next: (tasks) => {
        this.toDoTasks = tasks; // Directly assign tasks to toDoTasks
        console.log('ToDo Tasks:', this.toDoTasks); // Check if tasks are logged correctly
      },
      error: (err) => {
        console.error('Error retrieving tasks:', err);
      }
    });
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }


  // Funkcja do obliczania liczby dni do terminu zadania
  daysUntilDeadline(deadline: string | Date): number {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceInMilliseconds = deadlineDate.getTime() - currentDate.getTime();
    return Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));
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
  
  }




