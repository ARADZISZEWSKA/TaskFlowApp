import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sliderConfig = {
    spaceBetween:  1,
    slidesPerView: 1.7
  } 

  constructor() {}

}