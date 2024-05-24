// AdminHomepagePage.ts
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, createAnimation } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'
import { Project } from '../../models/projects.model'; 
import { ProjectDetailsModalComponent } from 'src/app/pages/admin-homepage/modals/project-details-modal/project-details-modal.component';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ProjectDetailsHomeModalComponent } from '../home/modals/project-details-home-modal/project-details-home-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  
  projects: Project[] = []; // Stores the list of projects
  tasksMap: { [projectId: string]: { tasks: Task[], completionRate: number } } = {};
  todayTasksMap: { [projectId: string]: Task[] } = {};

  tasks: Task[] = [];
  username: string | null | undefined;
  
  
 
  constructor(
    private modalController: ModalController,
    private toastController:ToastController,
    private router: Router,
    private projectService: ProjectService,
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
  
  goToSettings(): void {
    this.router.navigateByUrl('/settings-admin'); 
  }

  goToTasks(): void {
    this.router.navigateByUrl('/tasks-admin'); 
  }

  goToHome(): void {
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
