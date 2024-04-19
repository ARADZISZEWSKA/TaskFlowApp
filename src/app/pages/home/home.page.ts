import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';


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
  username: string | null | undefined;
 
  

  ngOnInit() {
    this.username = localStorage.getItem('username') ;
  }
//---Tab---
  constructor(
    private router: Router
  ){}

  goToSettings(): void {
    this.router.navigateByUrl('/settings'); 
  }

  goToTasks(): void {
    this.router.navigateByUrl('/tasks'); 
  }

  goToHome(): void {
    this.router.navigateByUrl('/home'); 
  }

}