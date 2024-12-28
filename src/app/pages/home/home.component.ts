import { Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  auth = inject(Auth)
  router = inject(Router)
  
  onClick() {
    signOut(this.auth)
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.log(err))
  }
}
