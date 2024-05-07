import { Component } from '@angular/core';
import { register } from 'swiper/element';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  constructor() {}
}
