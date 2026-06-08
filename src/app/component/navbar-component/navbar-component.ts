import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '/reserve';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateCurrentRoute();
    this.router.events.subscribe(() => {
      this.updateCurrentRoute();
    });
  }

  private updateCurrentRoute(): void {
    const segments = this.router.url.split('/');
    this.currentRoute = '/' + (segments[1] || 'reserve');
  }

  navigateTo(route: string): void {
    if (route !== this.currentRoute) {
      this.router.navigate([route]);
    }
  }


}
