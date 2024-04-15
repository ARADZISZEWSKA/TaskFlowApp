import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-user-modal',
  templateUrl: './register-user-modal.component.html',
  styleUrls: ['./register-user-modal.component.scss'],
})
export class RegisterUserModalComponent implements OnInit {
  public progress = 0;
  public user = { firstName: '', lastName: '', email: '', password: '' };

  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async register() {
    try {
      const response = await this.http.post<any>('http://localhost:5139/user/register', this.user).toPromise();
      console.log('Response from backend:', response);
      // Tutaj możesz dodać kod do obsługi odpowiedzi z backendu, np. wyświetlić komunikat o powodzeniu rejestracji
      this.dismissModal(); // Zamknij modal po udanej rejestracji
    } catch (error) {
      console.error('Error while registering user:', error);
      // Tutaj możesz dodać kod do obsługi błędów, np. wyświetlić komunikat o niepowodzeniu rejestracji
    }
  }

  updateProgress() {
    this.progress += 0.25;
    if (this.progress > 1) {
      this.progress = 1;
    }
  }
}

