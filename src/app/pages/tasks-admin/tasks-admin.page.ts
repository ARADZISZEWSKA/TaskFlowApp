// AdminHomepagePage.ts
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'
import { Project } from '../../models/projects.model'; 
import { ProjectDetailsModalComponent } from 'src/app/pages/admin-homepage/modals/project-details-modal/project-details-modal.component';
import { Task} from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-admin.page.html',
  styleUrls: ['./tasks-admin.page.scss'],
})
export class TasksAdminPage implements OnInit {
  projects: Project[] = [];
  completionRates: { [projectId: string]: number } = {};
  tasksMap: { [projectId: string]: Task[] } = {}; // Stores tasks for each project as an object
  tasks: Task[] = [];


  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController:ToastController,
    private projectService: ProjectService,
    private taskService:TaskService 
  ) {}
  
  // Funkcja do pobierania i ładowania projektów
  loadProjects() {
    this.projectService.getUserProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        projects.forEach(project => {
          this.calculateProjectCompletion(project.id);
          this.loadTasksForProject(project.id); // Load tasks for each project
        });
      },
      error: (error) => console.error('Failed to load projects', error)
    });
  }


  loadTasksForProject(projectId: string) {
    this.taskService.getAllTasksByProjectAdmin(projectId).subscribe({
      next: (tasks) => {
        this.tasksMap[projectId] = tasks; // Store tasks in the object
      },
      error: (error) => console.error(`Failed to load tasks for project ${projectId}`, error)
    });
  }

  calculateProjectCompletion(projectId: string) {
    this.taskService.getAllTasksByProjectAdmin(projectId).subscribe({
      next: (tasks) => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'completed').length;
        this.completionRates[projectId] = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        console.log(`Completion rate for ${projectId}: ${this.completionRates[projectId]}%`);
      },
      error: (error) => {
        console.error(`Failed to load tasks for project ${projectId}`, error);
        this.completionRates[projectId] = 0; // Set to 0 in case of error
      }
    });
  }


  daysUntilDeadline(deadline: string | Date): number {
    // Ensure deadline is a Date object
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceInMilliseconds = deadlineDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));
    return differenceInDays;
  
  }
  async openProjectDetailsModal(projectId: string) {
    try {
      const project = await this.projectService.getProjectById(projectId).toPromise();
      const modal = await this.modalController.create({
        component: ProjectDetailsModalComponent,
        componentProps: {
          project: project,
          onModalDismiss: () => this.loadProjects() // Pass the callback function
        }
      });
      await modal.present();
    } catch (error) {
      console.error('Error fetching project details', error);
      this.showToast('Failed to open project details. Please try again later.');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duration in milliseconds
      position: 'bottom' // Position of the toast message
    });
    toast.present();
  }

  
  

  // Funkcje nawigacji
  goToSettingsAdmin(): void {
    this.router.navigateByUrl('/settings-admin'); 
  }
  
  goToTasksAdmin(): void {
    this.router.navigateByUrl('/tasks-admin'); 
  }
  
  goToAdminHomepage(): void {
    this.router.navigateByUrl('/admin-homepage'); 
  }

  ngOnInit() {
    this.loadProjects(); // Ładujemy projekty przy inicjalizacji komponentu
  }
}
