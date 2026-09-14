import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppTheme, ThemeService, UserAuth } from '@angularModuleFederation/data-access-user';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'angularModuleFederation-root',
  template: `
  <!-- src/app/app.component.html -->
    <div class="min-h-screen bg-background text-text p-8 transition-colors duration-300">
      <header class="flex justify-between items-center max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-primary">Dynamic Theming System</h1>
        
        <!-- Theme Select Buttons -->
        <div class="flex gap-2">
          @for (theme of themes; track theme) {
            <button 
              (click)="themeService.setTheme(theme)"
              [class.ring-2]="themeService.currentTheme() === theme"
              class="px-4 py-2 rounded-lg bg-secondary text-background font-medium capitalize ring-primary transition">
              {{ theme }}
            </button>
          }
        </div>
      </header>

      <main class="max-w-4xl mx-auto mt-12 bg-background border border-text/10 p-6 rounded-xl shadow-md">
        <p class="text-lg">
          This box adapts immediately when you swap themes because it uses standard class combinations like <code class="bg-text/10 px-1 rounded">bg-background</code> and <code class="bg-text/10 px-1 rounded">text-primary</code>!
        </p>
      </main>
    </div>
    <div class="dashboard-nav">Admin Dashboard</div>
    @if (isLoggedIn$ | async) {
      <div>
        You are authenticated so you can see this content.
      </div>
    } @else {
      <router-outlet></router-outlet>
    }
  `,
})
export class App implements OnInit {
  private router = inject(Router);
  private userAuth = inject(UserAuth);
  isLoggedIn$ = this.userAuth.isUserLoggedIn$;
  
  themeService = inject(ThemeService);
  themes: AppTheme[] = ['light', 'dark', 'autumn', 'ocean'];

  ngOnInit() {
    console.log('App initialized');
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('');
          }
        });
      });
  }
}