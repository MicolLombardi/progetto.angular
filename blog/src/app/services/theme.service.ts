import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeKey = 'isDarkMode';

  setDarkMode(isDark: boolean): void {
    localStorage.setItem(this.darkModeKey, JSON.stringify(isDark));
    this.updateTheme(isDark);
  }

  getDarkMode(): boolean {
    const storedMode = localStorage.getItem(this.darkModeKey);
    console.log('get',storedMode);
    return storedMode ? JSON.parse(storedMode) : false; // Default: modalità chiara
  }

  updateTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode'); // Applica anche all'html
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }
  
}
