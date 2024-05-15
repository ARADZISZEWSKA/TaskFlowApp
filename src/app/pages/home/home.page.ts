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


  isMobile = false;
 
  constructor(
    private modalController: ModalController,
    private toastController:ToastController,
    private router: Router,
    private projectService: ProjectService,
    private platform: Platform, // Inject the ProjectService
    private userService: UserService,
    private taskService:TaskService
    
  ) {

    this.isMobile = this.platform.is('mobile');
  }

  sliderConfig = {
    
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true}
  };

  username: string | null | undefined;
  
  playCheckboxAnimation(event: { srcElement: any; }): void{
    console.log(event);
    (createAnimation('')
      .addElement(event.srcElement)
      .easing('cubic-bezier(0, 0.55, 0.45, 1)')
      .duration(500)
      .fromTo('transform', 'rotate(0)', 'rotate(360deg)')).play();
  }
  ngOnInit() {
    this.loadProjects();
    this.username = localStorage.getItem('username') ; // Load projects when component initializes
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
      next: (tasks) => this.tasksMap[projectId] = tasks,
      error: (error) => {
        console.error('Failed to load tasks:', error);
        this.tasksMap[projectId] = [];
      }
    });
  }

  
  
  
  
  



  async openProjectDetailsModal(projectId: string) {
    try {
      const project = await this.projectService.getProjectById(projectId).toPromise();
      const modal = await this.modalController.create({
        component: ProjectDetailsModalComponent,
        componentProps: {
          project: project 
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