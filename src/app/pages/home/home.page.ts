import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform, ToastController, createAnimation } from '@ionic/angular';
import { Project } from 'src/app/models/projects.model';
import { ProjectService } from 'src/app/services/project.service';
import { AddProjectModalComponent } from '../admin-homepage/modals/add-project-modal/add-project-modal.component';
import { RegisterUserModalComponent } from '../admin-homepage/modals/register-user-modal/register-user-modal.component';
import { ProjectDetailsModalComponent } from '../admin-homepage/modals/project-details-modal/project-details-modal.component';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectDetailsHomeModalComponent } from './modals/project-details-home-modal/project-details-home-modal.component';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  projects: Project[] = []; // Stores the list of projects
  tasksMap: { [projectId: string]: Task[] } = {};
  tasks: Task[] = [];
  username: string | null | undefined;
  
  
 
  constructor(
    private modalController: ModalController,
    private toastController:ToastController,
    private router: Router,
    private projectService: ProjectService,
    private platform: Platform, // Inject the ProjectService
    private userService: UserService,
    private taskService:TaskService
    
  ) {}

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true}
  };

 
  
  // Component method to handle checkbox click
  playCheckboxAnimation(event: any, task: Task): void {
    console.log(event);
    const newStatus = task.status === 'completed' ? 'not completed' : 'completed';
    this.taskService.updateTaskStatus(task.id!, newStatus).subscribe({
      next: () => {
        task.status = newStatus; 
        createAnimation('')
          .addElement(event.srcElement)
          .easing('cubic-bezier(0, 0.55, 0.45, 1)')
          .duration(500)
          .fromTo('transform', 'rotate(0)', 'rotate(360deg)').play();
      },
      error: (error) => console.error('Failed to update task status:', error)
    });
  }
  

    ngOnInit() {
      this.loadProjects();
      this.archiveAndDeleteCompletedTasks();
      this.username = localStorage.getItem('username') ; // Load projects when component initializes
    }

  

    archiveAndDeleteCompletedTasks() {
      this.taskService.archiveAndDeleteCompletedTasks().subscribe({
        next: (response) => {
          // Assuming response is already a JavaScript object
          if (response.success) {
            this.loadProjects();
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
    
    

      loadProjects() {
        this.projectService.getAssignedProjects().subscribe({
          next: (projects) => {
            this.projects = projects;
            projects.forEach(project => {
              this.loadTasksDueToday(project.id);
            });
          },
          error: (error) => console.error('Failed to load projects', error)
        });
      }


      loadTasksDueToday(projectId: string) {
        this.taskService.getTodayTasksByProject(projectId).subscribe({
          next: (tasks) => {
            this.tasksMap[projectId] = tasks;
            console.log('Tasks loaded successfully:', tasks);
          },
          error: (error) => {
            // Check if the error status is a client-side error (e.g., network issues, no server response)
            if (error.status && error.status >= 400) {
              console.error('Failed to load tasks due to server error:', error);
            } else {
              console.log('Failed to load tasks', error);
            }
            this.tasksMap[projectId] = [];
          }
        });
      }
  

      async openProjectDetailsHomeModal(project: Project) {
        try {
          const modal = await this.modalController.create({
            component: ProjectDetailsHomeModalComponent,
            componentProps: { project: project }
          });
          await modal.present();
        } catch (error) {
          console.error('Error opening modal', error);
          this.showToast('Failed to open project details. Please try again later.');
        }}
  
  // Function to display a toast message
  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duration in milliseconds
      position: 'bottom' // Position of the toast message
    });
    toast.present();
  }
  
  goToSettingsAdmin(): void {
    this.router.navigateByUrl('/settings-admin'); 
  }

  goToTasksAdmin(): void {
    this.router.navigateByUrl('/tasks-admin'); 
  }

  goToAdminHomepage(): void {
    this.router.navigateByUrl('/admin-homepage'); 
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.loadProjects();
    event.detail.complete();
    }, 1000);
  }
  
  
  daysUntilDeadline(deadline: string | Date): number {
    // Ensure deadline is a Date object
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceInMilliseconds = deadlineDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));
    return differenceInDays;
  
}
goToTasksPage() {
  this.router.navigateByUrl('/tasks-admin');

}

}