import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, createAnimation } from '@ionic/angular';
import { Project } from 'src/app/models/projects.model';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { ProjectDetailsHomeModalComponent } from './modals/project-details-home-modal/project-details-home-modal.component';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  projects: Project[] = [];
  tasksMap: { [projectId: string]: { tasks: Task[], completionRate: number } } = {};
  todayTasksMap: { [projectId: string]: Task[] } = {};

  tasks: Task[] = [];
  username: string | null | undefined;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true }
  };

  ngOnInit() {
    this.loadProjects();
    this.archiveAndDeleteCompletedTasks();
    this.username = localStorage.getItem('username');
  }

  archiveAndDeleteCompletedTasks() {
    this.taskService.archiveAndDeleteCompletedTasks().subscribe({
      next: (response) => {
        if (response.success) {
          this.loadProjects();
        } else {
          console.error('API succeeded but indicated failure:', response.message);
        }
      },
      error: (error) => {
        console.error('Failed to archive and delete tasks:', error.error);
      }
    });
  }

  loadProjects() {
    this.projectService.getAssignedProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        projects.forEach(project => {
          this.loadTasksForProject(project.id);
          this.loadTasksDueToday(project.id);
        });
      },
      error: (error) => console.error('Failed to load projects', error)
    });
  }

  private calculateCompletionRate(tasks: Task[]): number {
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  }

  loadTasksDueToday(projectId: string) {
    this.taskService.getTodayTasksByProject(projectId).subscribe({
      next: (tasks) => {
        this.todayTasksMap[projectId] = tasks;
      },
      error: (error) => {
        console.error('Failed to load today\'s tasks:', error);
        this.todayTasksMap[projectId] = [];
      }
    });
  }

  loadTasksForProject(projectId: string) {
    this.taskService.getAllTasksByProject(projectId).subscribe({
      next: (tasks) => {
        const completedTasks = tasks.filter(task => task.status === 'completed').length;
        const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
        this.tasksMap[projectId] = { tasks, completionRate };
      },
      error: (error) => {
        console.error(`Failed to load tasks for project ${projectId}`, error);
        this.tasksMap[projectId] = { tasks: [], completionRate: 0 };
      }
    });
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

  async openProjectDetailsHomeModal(project: Project) {
    try {
      const modal = await this.modalController.create({
        component: ProjectDetailsHomeModalComponent,
        componentProps: { project: project }
      });

      modal.onDidDismiss().then(() => {
        this.loadProjects(); // Refresh the projects when the modal is dismissed
      });

      await modal.present();
    } catch (error) {
      console.error('Error opening modal', error);
      this.showToast('Failed to open project details. Please try again later.');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
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
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceInMilliseconds = deadlineDate.getTime() - currentDate.getTime();
    return Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));
  }

  goToTasksPage() {
    this.router.navigateByUrl('/tasks-admin');
  }
}
