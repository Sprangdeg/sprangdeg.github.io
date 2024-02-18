import { NavigationEnd, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { VERSION } from 'src/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavMenu = true;
  currentRoute = '';
  version = VERSION.timestamp;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  toggleNavMenu() {
    this.showNavMenu = !this.showNavMenu;
  }
}
