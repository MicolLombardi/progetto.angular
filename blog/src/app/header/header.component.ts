import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoggedInUser } from '../logged-in-user';
import { ThemeService } from '../services/theme.service';

declare var bootstrap: any; // Assicura l'uso di Bootstrap JS

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isDarkMode: boolean = false;
  loggedInUser: LoggedInUser | null = null;

  @ViewChild('navbarNav') navbarNav!: ElementRef;
  bsCollapse!: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user;
    });

    this.isDarkMode = this.themeService.getDarkMode();
    this.themeService.updateTheme(this.isDarkMode);
  }

  ngAfterViewInit(): void {
    this.bsCollapse = new bootstrap.Collapse(this.navbarNav.nativeElement, {
      toggle: false
    });
  }

  closeNavbar(): void {
    if (this.bsCollapse && this.bsCollapse._isShown) {
      this.bsCollapse.hide();
    }
  }

  toggleNavbar(): void {
    if (this.bsCollapse) {
      this.bsCollapse.toggle();
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeNavbar(); // Chiude il menu quando fai logout
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
    this.themeService.updateTheme(this.isDarkMode);
  }
}
