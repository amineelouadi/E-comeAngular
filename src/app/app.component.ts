import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main class="container mx-auto px-4 py-8">
      <router-outlet />
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'ShopSmart';
  private lastRoute: string = '';

  constructor(private router: Router) {
    // Listen for navigation start events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.lastRoute = event.url;
      }
    });
}
getLastRoute(): string {
  return this.lastRoute;
}
}