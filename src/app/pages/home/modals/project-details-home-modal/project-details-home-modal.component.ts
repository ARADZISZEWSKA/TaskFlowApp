import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/projects.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { ModalController, createAnimation } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-project-details-home-modal',
  templateUrl: './project-details-home-modal.component.html',
  styleUrls: ['./project-details-home-modal.component.scss'],
})
export class ProjectDetailsHomeModalComponent implements OnInit {
  tasks: Task[] = [];
  @Input() project!: Project;
  @Input() onModalDismiss!: () => void; // Callback to refresh parent component
  tasksMap: { [projectId: string]: Task[] } = {};

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.archiveAndDeleteCompletedTasks();
    if (this.project && this.project.id) {
      this.loadTasks(this.project.id);
    } else {
      console.error('Project data is undefined');
    }
  }

  archiveAndDeleteCompletedTasks() {
    this.taskService.archiveAndDeleteCompletedTasks().subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Tasks deleted successfully');
        } else {
          console.error('API succeeded but indicated failure:', response.message);
        }
      },
      error: (error) => {
        console.error('Failed to archive and delete tasks:', error.error);
      }
    });
  }

  loadTasks(projectId: string) {
    this.taskService.getAllTasksByProject(projectId).subscribe({
      next: (tasks) => {
        this.tasksMap[projectId] = tasks;
        this.tasks = tasks; // Directly update the tasks array
      },
      error: (error) => {
        console.error('Failed to load tasks:', error);
      }
    });
  }



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

  dismiss() {
    this.modalController.dismiss(null, 'dismiss');
    this.onModalDismiss(); // Call the callback to refresh parent component
  }
}
