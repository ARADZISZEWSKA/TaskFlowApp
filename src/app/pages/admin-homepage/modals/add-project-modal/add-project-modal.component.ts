import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() ownerId: string | undefined;
  @Input() onModalDismiss!: () => void; 
  newProject: Project = new Project();
  @ViewChild('memberModal', { static: true }) memberModal!: IonModal;

  selectedMembersText = '0 Items';
  selectedMembers: string[] = [];
  members: any[] = [];  

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.fetchUsers(); 
  }

  fetchUsers() {
    this.userService.getUsersByOwner().subscribe(users => { 
      this.members = users.map(user => ({
        text: `${user.firstName} ${user.lastName}`,
        value: user.id,
        firstName: user.firstName, // Store firstName
        lastName: user.lastName // Store lastName
      }));
    });
  }

  memberSelectionChanged(selectedUserIds: string[]) {
    this.selectedMembers = selectedUserIds;
    this.selectedMembersText = this.formatData(this.members.filter(member => selectedUserIds.includes(member.value)));
    this.memberModal.dismiss();
  }

  getSelectedUsersNames(): string[] {
    return this.members
      .filter(member => this.selectedMembers.includes(member.value))
      .map(member => `${member.firstName || ''} ${member.lastName || ''}`)
      .filter(name => name.trim().length > 0);
  }
  

  private formatData(users: any[]): string {
    return `${users.length} users`;
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
    this.onModalDismiss(); 
  }

  confirm() {
    this.modalController.dismiss({ success: true }, 'confirm');
    this.addProject();
    this.launchConfetti(); // Uruchomienie confetti po kliknięciu przycisku "Confirm"
  }

  async addProject(): Promise<void> {
    try {
        // Set the member IDs directly to the newProject object
        this.newProject.members = this.selectedMembers;
      
        const response = await this.http.post<any>('https://taskflowapp.azurewebsites.net/projects/create', this.newProject, {
            withCredentials: true
        }).toPromise();

        console.log(response);
        this.modalController.dismiss({ success: true }); // przekazujemy dane wynikowe, które będą dostępne w komponencie rodzica po zamknięciu
        this.onModalDismiss(); 
    } catch (error) {
        console.error('Failed to add project:', error); 
    }
  }

  launchConfetti() {
    const confetti = (window as any).confetti;

    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
}

}
