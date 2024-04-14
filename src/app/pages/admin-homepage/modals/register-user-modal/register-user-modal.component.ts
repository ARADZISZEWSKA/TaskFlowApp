import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-register-user-modal',
  templateUrl: './register-user-modal.component.html',
  styleUrls: ['./register-user-modal.component.scss'],
})
export class RegisterUserModalComponent  implements OnInit {

  constructor(private modalController: ModalController) { } // Dodanie ModalController w konstruktorze

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss(); // Poprawne wywołanie dismiss z modalController
  }
  
  register() {
    // Logika do rejestrowania użytkownika
  }
  
}
