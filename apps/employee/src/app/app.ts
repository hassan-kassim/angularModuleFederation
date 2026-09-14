import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from '../../../../libs/shared/data-access-user/src/lib/theme.service.';

@Component({
  imports: [ RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'employee';
   
  themeService = inject(ThemeService);
  themes: AppTheme[] = ['light', 'dark', 'autumn', 'ocean'];
}
