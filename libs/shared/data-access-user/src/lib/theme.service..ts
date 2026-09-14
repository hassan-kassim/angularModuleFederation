// src/app/services/theme.service.ts
import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type AppTheme = 'light' | 'dark' | 'autumn' | 'ocean';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  
  // Track state using Angular Signals
  currentTheme = signal<AppTheme>(
    (localStorage.getItem('app-theme') as AppTheme) || 'light'
  );

  constructor() {
    // Automatically apply the theme mutation whenever the signal changes
    effect(() => {
      const theme = this.currentTheme();
      const renderer = this.document.documentElement;
      
      // Update HTML attribute
      renderer.setAttribute('data-theme', theme);
      
      // Persist choice
      localStorage.setItem('app-theme', theme);
    });
  }

  setTheme(theme: AppTheme) {
    this.currentTheme.set(theme);
  }
}
