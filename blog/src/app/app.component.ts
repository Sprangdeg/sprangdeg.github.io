import { NavigationEnd, Router, RouterOutlet, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { VERSION } from 'src/version';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatTooltipModule,
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterModule
  ],
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
