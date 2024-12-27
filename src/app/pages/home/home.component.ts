import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  authService = inject(AuthService)
  router = inject(Router)
  
  onClick() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.log(err))
  }
}
