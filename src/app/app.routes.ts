import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';	
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign up',
        ...canActivate(() => redirectLoggedInTo(['/home']))
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Log in',
        ...canActivate(() => redirectLoggedInTo(['/home']))
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        title: 'Recover Password'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [roleGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
