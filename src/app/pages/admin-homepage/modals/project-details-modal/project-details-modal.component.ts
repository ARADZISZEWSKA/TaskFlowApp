import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/projects.model';
import { User } from 'src/app/models/user.model';
import { ModalController, ToastController } from '@ionic/angular';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-project-details-modal',
  templateUrl: './project-details-modal.component.html',
  styleUrls: ['./project-details-modal.component.scss']
})
export class ProjectDetailsModalComponent implements OnInit {
  @Input() project!: Project;
  users: User[] | null = null; 
  overdueTasks: any[] | null = null;

  constructor(
    private projectService: ProjectService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    if (this.project && this.project.id) {
      try {
        console.log(`Fetching members for project ID: ${this.project.id}`);
        const users = await this.projectService.getUserProjectMembers(this.project.id).toPromise();
        console.log(users);
        this.users = users as User[];
  
        // Fetch overdue tasks
        const tasks = await this.projectService.getOverdueTasks(this.project.id).toPromise();
        this.overdueTasks = tasks as any[];
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  // Funkcja do obliczania liczby dni do terminu zadania
  daysUntilDeadline(deadline: string | Date): number {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const differenceInMilliseconds = deadlineDate.getTime() - currentDate.getTime();
    return Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));
  }

  async openProfileModal(user: any) {
    const modal = await this.modalController.create({
      component: UserProfileModalComponent,
      componentProps: {
        user: user,
        projectId: this.project.id
      }
    });
    return await modal.present();
  }

  async deleteProject() {
    const projectId = this.project.id; // Pobranie ID projektu
    try {
      await this.projectService.deleteProject(projectId).toPromise();
      const toast = await this.toastController.create({
        message: 'Project deleted successfully!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      // Zamknij modal po usunięciu projektu
      this.modalController.dismiss(null, 'delete');
    } catch (error) {
      console.error('Error deleting project:', error);
      // Obsłuż błąd usuwania projektu, np. wyświetl toast z informacją o błędzie
      const toast = await this.toastController.create({
        message: 'Failed to delete project. Please try again later.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
  
  }

