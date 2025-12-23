import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AdminLoginComponent } from './features/admin-login/admin-login.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { DesktopComponent } from './core/components/desktop/desktop.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: DesktopComponent
  }
];
