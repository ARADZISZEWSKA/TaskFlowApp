// AdminHomepagePage.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProjectModalComponent } from './modals/add-project-modal/add-project-modal.component';
import { RegisterUserModalComponent } from './modals/register-user-modal/register-user-modal.component';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'
import { Project } from '../../models/projects.model'; 
import { ProjectDetailsModalComponent } from './modals/project-details-modal/project-details-modal.component';
import { UserProfileModalComponent } from './modals/user-profile-modal/user-profile-modal.component';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.page.html',
  styleUrls: ['./admin-homepage.page.scss'],
})
export class AdminHomepagePage implements OnInit {
  projects: Project[] = []; // Stores the list of projects

  
 
  constructor(
    private modalController: ModalController,
    private toastController:ToastController,
    private router: Router,
    private projectService: ProjectService // Inject the ProjectService
    
  ) {}

  sliderConfig = {
    slidesPerView: 2,
    spaceBetween: 20,
    slidesPerGroup: 1,
    navigation: true, // Dodaj nawigację
  } 

  username: string | null | undefined;

  ngOnInit() {
    this.loadProjects();
    this.username = localStorage.getItem('username') ; // Load projects when component initializes
  }

  loadProjects() {
    this.projectService.getUserProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Failed to load projects', error);
      }
    });
  }

  async openAddProjectModal() {
    const modal = await this.modalController.create({
      component: AddProjectModalComponent,
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
  this.router.navigateByUrl('/tasks');

}
}

