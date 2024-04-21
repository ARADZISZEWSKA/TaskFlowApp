// AdminHomepagePage.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProjectModalComponent } from './modals/add-project-modal/add-project-modal.component';
import { RegisterUserModalComponent } from './modals/register-user-modal/register-user-modal.component';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'
import { Project } from '../../models/projects.model'; 
import { ProjectDetailsModalComponent } from './modals/project-details-modal/project-details-modal.component';



@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.page.html',
  styleUrls: ['./admin-homepage.page.scss'],
})
export class AdminHomepagePage implements OnInit {
  projects: Project[] = []; // Stores the list of projects

 
  constructor(
    private modalController: ModalController,
    private router: Router,
    private projectService: ProjectService // Inject the ProjectService
    
  ) {}

  username: string | null | undefined;

  ngOnInit() {
    this.loadProjects(); // Load projects when component initializes
    this.username = localStorage.getItem('username') ;
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

  async openProjectDetailsModal(project: Project) {
    const modal = await this.modalController.create({
      component: ProjectDetailsModalComponent,
      componentProps: {
        project: project // Przekazanie danych projektu do modalu
      }
    });
    return await modal.present();
  }

  goToSettings(): void {
    this.router.navigateByUrl('/settings'); 
  }

  goToTasks(): void {
    this.router.navigateByUrl('/tasks'); 
  }

  goToAdminHomepage(): void {
    this.router.navigateByUrl('/admin-homepage'); 
  }
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 1000);
  }
  sliderConfig = {
    slidesPerView: 2,
    spaceBetween: 30
  } 
  
  daysUntilDeadline(deadline: string | Date): number {
    // Ensure deadline is a Date object
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceInMilliseconds = deadlineDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));
    return differenceInDays;
  }
  
  
}
