import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/projects.model';
import { User } from 'src/app/models/user.model';
import { ModalController, ToastController, createAnimation } from '@ionic/angular';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';
import { Task } from '../../../../models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-project-details-modal',
  templateUrl: './project-details-modal.component.html',
  styleUrls: ['./project-details-modal.component.scss']
})
export class ProjectDetailsModalComponent implements OnInit {
  @Input() project!: Project;
  @Input() onModalDismiss!: () => void; // Callback to be called on dismiss
  users: User[] | null = null; // Initialize with null
  overdueTasks: any[] | null = null; // Initialize with null
  tasks: Task[] = [];

  constructor(
    private projectService: ProjectService,
    private modalController: ModalController,
    private toastController: ToastController,
    private taskService: TaskService
  ) {}
/*
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
    this.archiveAndDeleteCompletedTasks();
    //nowe na dole
    this.editableProject = { ...this.project };
  }
*/

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
  this.editableProject = { ...this.project }
}

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  // nowe do gory

  /*
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
*/
  cancel() {
    this.modalController.dismiss(null, 'cancel');
    this.onModalDismiss(); // Call the callback function when the modal is dismissed
  }

  // Function to calculate days until task deadline
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
        projectId: this.project.id,
        onModalDismiss: () => this.loadProjectDetails() // Pass the callback function
      }
    });

    return await modal.present();
  }

  async deleteProject() {
    const projectId = this.project.id; // Get project ID
    try {
      await this.projectService.deleteProject(projectId).toPromise();
      const toast = await this.toastController.create({
        message: 'Project deleted successfully!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      // Close modal after project is deleted
      this.modalController.dismiss(null, 'delete');
      this.onModalDismiss(); // Call the callback function after deleting the project
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle project deletion error, e.g., show a toast with error message
      const toast = await this.toastController.create({
        message: 'Failed to delete project. Please try again later.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  async deleteUserFromProject(user: User) {
    const projectId = this.project.id; // Get project ID
    const userId = user.id; // Get user ID

    try {
      await this.projectService.deleteUserFromProject(projectId, userId).toPromise();
      const toast = await this.toastController.create({
        message: 'User and associated tasks deleted successfully!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      // Refresh project details after user is deleted
      this.loadProjectDetails();
    } catch (error) {
      console.error('Error deleting user from project:', error);
      const toast = await this.toastController.create({
        message: 'Failed to delete user from project. Please try again later.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  //Edycja
  isEditing = false;  // Flaga do przełączania trybu edycji
  editableProject!: Project;  // Kopia projektu do edycji

  async saveProject() {
    try {
      await this.projectService.updateProject(this.editableProject).toPromise();
      this.project = { ...this.editableProject };  // Aktualizacja oryginalnego projektu
      this.isEditing = false;
      const toast = await this.toastController.create({
        message: 'Project updated successfully!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      console.error('Error updating project:', error);
      const toast = await this.toastController.create({
        message: 'Failed to update project. Please try again later.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
  

  playCheckboxAnimation(event: any, task: Task): void {
    console.log(event);
    const newStatus = task.status === 'completed' ? 'not completed' : 'completed';
    this.taskService.updateTaskStatus(task.id!, newStatus).subscribe({
      next: () => {
        task.status = newStatus; // Update local task model
        createAnimation('')
          .addElement(event.srcElement)
          .easing('cubic-bezier(0, 0.55, 0.45, 1)')
          .duration(500)
          .fromTo('transform', 'rotate(0)', 'rotate(360deg)').play();
      },
      error: (error) => console.error('Failed to update task status:', error)
    });
  }

  loadProjectDetails() {
    // Reload project details and tasks
    this.ngOnInit();
  }
}
