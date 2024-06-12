import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PushNotifications } from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  async registerFirebaseToken(userId: string) {
    try {
      // Request permission to send notifications
      let permStatus = await PushNotifications.requestPermissions();

      if (permStatus.receive !== 'granted') {
        throw new Error('Permission not granted');
      }

      // Register to receive push notifications
      await PushNotifications.register();

      // Get the registration token
      PushNotifications.addListener('registration', async (token) => {
        console.log('Push registration success, token: ' + token.value);

        // Send the token to the server
        await this.http.post(`https://taskflowapp.azurewebsites.net/user/${userId}/firebase-token`, { token: token.value }).toPromise();
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.error('Push registration error: ', error.error);
      });
    } catch (error) {
      console.error('Error registering Firebase token: ', error);
    }
  }
}
