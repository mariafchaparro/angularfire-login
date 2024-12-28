import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import {errorMessage} from '../../utils/error-handler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)
  toastr = inject(ToastrService)

  // Spinner
  loading: boolean = false
  // Password input type
  type: string = 'password'

  loginForm = new FormGroup(
    {
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
      password: new FormControl('', { nonNullable: true, validators: Validators.required})
    }
  )

  onSubmit() {
    this.loading = true
    const rawForm = this.loginForm.getRawValue()

    this.authService.login(rawForm.email, rawForm.password)
      .then(() => {
        this.router.navigate(['/home'])
      })
      .catch((err) => {
        this.loading = false
        this.toastr.error(errorMessage(err.code),'Error')
      })
  }

  showPassword() {
    if (this.type === 'password') {
      this.type = 'text'
    } else {
      this.type = 'password'
    }
  }
}
