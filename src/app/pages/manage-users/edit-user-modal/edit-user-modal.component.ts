import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent {

  @Input() id!: string; 

  // Użytkownik do edycji
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    tasks: [],
  };

  constructor(
    private userService: UserService,
    private modalController: ModalController
  ) { }

  saveChanges() {
    const updatedUserData: any = {};
  
    // Sprawdź, które pola zostały zmienione i dodaj je do obiektu updatedUserData
    if (this.user.firstName !== '') {
      updatedUserData.firstName = this.user.firstName;
    }
  
    if (this.user.lastName !== '') {
      updatedUserData.lastName = this.user.lastName;
    }
  
    if (this.user.email !== '') {
      updatedUserData.email = this.user.email;
    }
  
    if (this.user.role !== '') {
      updatedUserData.role = this.user.role;
    }
   
    updatedUserData.password = '';
    updatedUserData.Tasks = [];

  
    // Wywołaj metodę updateUser z serwisu UserService, przekazując ID użytkownika i obiekt z edytowanymi danymi
    this.userService.updateUser(this.id, updatedUserData).subscribe({
      next: () => {
        console.log('User updated successfully.');
        this.modalController.dismiss(); // Zamknij modal po zapisaniu zmian
      },
      error: (error) => {
        console.error('Error updating user:', error);
        // Obsłuż błąd tutaj
      }
    });
  }
  

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
