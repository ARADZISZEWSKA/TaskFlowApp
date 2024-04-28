// project-details-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/projects.model';
import { User } from 'src/app/models/user.model';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-project-details-modal',
  templateUrl: './project-details-modal.component.html',
  styleUrls: ['./project-details-modal.component.scss']
})
export class ProjectDetailsModalComponent implements OnInit {
  @Input() project!: Project;
  users: User[] = [];

  constructor(private projectService: ProjectService,
    private modalController: ModalController) {}

  ngOnInit() {
    if (this.project && this.project.id) {
      console.log(`Fetching members for project ID: ${this.project.id}`);
      this.projectService.getUserProjectMembers(this.project.id).subscribe(users => {
        console.log(users);
        this.users = users;
      }, error => {
        console.error('Error fetching project members', error);
      });
    }
}
cancel() {
  this.modalController.dismiss(null, 'cancel');
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