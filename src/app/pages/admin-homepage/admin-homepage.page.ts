import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, createAnimation } from '@ionic/angular';
import { AddProjectModalComponent } from './modals/add-project-modal/add-project-modal.component';
import { RegisterUserModalComponent } from './modals/register-user-modal/register-user-modal.component';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projects.model'; 
import { ProjectDetailsModalComponent } from './modals/project-details-modal/project-details-modal.component';
import { ToastController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model'; // Ensure Task model is imported
import { IonAccordionGroup } from '@ionic/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.page.html',
  styleUrls: ['./admin-homepage.page.scss'],
})
export class AdminHomepagePage implements OnInit {
  projects: Project[] = []; // Stores the list of projects
  completionRates: { [projectId: string]: number } = {};
  tasksMap: { [projectId: string]: Task[] } = {}; // Stores tasks for each project as an object
  tasks: Task[] = [];
  isMobile = false;
  username: string | null | undefined;
  @ViewChild('accordionGroup', { static: true }) accordionGroup!: IonAccordionGroup; // Add the definite assignment assertion

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
    private projectService: ProjectService,
    private platform: Platform, // Inject the ProjectService
    private taskService: TaskService
  ) {
    this.isMobile = this.platform.is('mobile');
  }

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true }
  };

  ngOnInit() {
    this.loadProjects();
    this.username = localStorage.getItem('username'); // Load projects when component initializes
    this.archiveAndDeleteCompletedTasks();
  }

  toggleAccordion(taskName: string) {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === taskName) {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = taskName;
    }
  }

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

  archiveAndDeleteCompletedTasks() {
    this.taskService.archiveAndDeleteCompletedTasks().subscribe({
      next: (response) => {
        // Assuming response is already a JavaScript object
        if (response.success) {
          console.log('Tasks deleted successfully');
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

  async openAddProjectModal() {
    const modal = await this.modalController.create({
      component: AddProjectModalComponent,
      componentProps: {
        onModalDismiss: () => this.loadProjects() // Pass the callback function
      }
    });

    return await modal.present();
  }

  async openRegisterUserModal() {
    const modal = await this.modalController.create({
      component: RegisterUserModalComponent,
    });
    return await modal.present();
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
      // Handle error gracefully, e.g., display a toast message
      this.showToast('Failed to open project details. Please try again later.');
    }
  }
  
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
