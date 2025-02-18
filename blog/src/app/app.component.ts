import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog';
  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    // Applica il tema all'inizio
    const isDarkMode = this.themeService.getDarkMode();
    console.log('carico theme');
    this.themeService.updateTheme(isDarkMode);

    // Riassegna il tema a ogni navigazione
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.themeService.updateTheme(this.themeService.getDarkMode());
      }
    });
  }
}
