import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {

  authService = inject(AuthService)
  router = inject(Router)
  toastr = inject(ToastrService)
  errorHandler = inject(ErrorHandlerService)

  // Spinner 
  loading: boolean = false;

  recoverPasswordForm = new FormGroup({
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]})
  })

  onSubmit() {
    this.loading = true

    this.authService.recoverPassword(this.recoverPasswordForm.getRawValue().email)
    .then(() => {
      this.toastr.info('We have sent a link to your email to reset your password.','Check your email')
      this.loading = false
    })
    .catch(err => {
      this.loading = false
      this.toastr.error(this.errorHandler.errorMessage(err.code), 'Error')
    })
  }
}
