import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Automatyczne przekierowanie po 2 sekundach
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  }

}
