// AdminHomepagePage.ts
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'
import { Project } from '../../models/projects.model'; 
import { ProjectDetailsModalComponent } from 'src/app/pages/admin-homepage/modals/project-details-modal/project-details-modal.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  projects: Project[] = []; // Tablica do przechowywania danych projektów
  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController:ToastController,
    private projectService: ProjectService // Wstrzykujemy serwis projektu
  ) {}
  
  // Funkcja do pobierania i ładowania projektów
  loadProjects() {
    this.projectService.getUserProjects().subscribe({
      next: (projects) => {
        this.projects = projects; // Przypisujemy pobrane projekty do zmiennej projects
      },
      error: (error) => {
        console.error('Failed to load projects', error);
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

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duration in milliseconds
      position: 'bottom' // Position of the toast message
    });
    toast.present();
  }

  
  

  // Funkcje nawigacji
  goToSettings(): void {
    this.router.navigateByUrl('/settings'); 
  }
  
  goToTasks(): void {
    this.router.navigateByUrl('/tasks'); 
  }
  
  goToHome(): void {
    this.router.navigateByUrl('/home'); 
  }

  ngOnInit() {
    this.loadProjects(); // Ładujemy projekty przy inicjalizacji komponentu
  }
}
