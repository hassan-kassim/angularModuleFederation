import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { App } from './app';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemote<typeof import('login/Routes')>('login/Routes').then(
        (m) => m!.remoteRoutes
      ),
  },
  {
    path: '',
    component: App,
  },
];