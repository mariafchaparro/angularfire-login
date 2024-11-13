import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';

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
        title: 'Sign up'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Log in'
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        title: 'Recover Password'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
