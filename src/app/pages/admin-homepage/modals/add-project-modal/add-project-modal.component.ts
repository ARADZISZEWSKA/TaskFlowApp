import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/models/projects.model';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {
  newProject: Project = new Project();
  @ViewChild('memberModal', { static: true }) memberModal!: IonModal;

  selectedMembersText = '0 Items';
  selectedMembers: string[] = [];
  members: any[] = [];  // This will be modified to work with the typeahead component

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(users => {
      this.members = users.map(user => ({
        text: `${user.firstName} ${user.lastName}`,
        value: user.id
      }));
    });
  }

  memberSelectionChanged(selectedUserIds: string[]) {
    this.selectedMembers = selectedUserIds;
    this.selectedMembersText = this.formatData(this.members.filter(member => selectedUserIds.includes(member.value)));
    this.memberModal.dismiss();
  }

  private formatData(users: any[]): string {
    if (users.length === 1) {
      return users[0].text;
    }
    return `${users.length} items`;
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss({ success: true }, 'confirm');
    this.addProject();
  }

  async addProject(): Promise<void> {
    try {
      // Set the member IDs directly to the newProject object
      this.newProject.members = this.selectedMembers;

      const response = await this.http.post<any>('http://localhost:5139/projects/create', this.newProject).toPromise();
      console.log(response); // Display server response
      this.modalController.dismiss({ success: true }); // Dismiss modal on successful response
    } catch (error) {
      console.error('Failed to add project:', error); // Display error message
    }
  }
}
