import { Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  auth = inject(Auth)
  router = inject(Router)
  
  onClick() {
    signOut(this.auth)
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.log(err))
  }
}
