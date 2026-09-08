import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuth } from '@angularModuleFederation/data-access-user';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'angularModuleFederation-root',
  template: `
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