import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then((component) => component.Login),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro').then((component) => component.Registro),
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
