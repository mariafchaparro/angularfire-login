import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  authService = inject(AuthService)
  router = inject(Router)
  toastr = inject(ToastrService)
  errorHandler = inject(ErrorHandlerService)

  // Spinner 
  loading: boolean = false;
  // Password input type
  type: string = 'password'
  validPassword: boolean = false

  signupForm = new FormGroup(
    {
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!%*?&#])[A-Za-z\d$@!%*?&#]*$/)]})
    }
  )

  onSubmit() {
    this.loading = true
    const formValue = this.signupForm.getRawValue()

    this.authService.register(formValue.email,formValue.password)
      .then(() => {
        this.toastr.success('The user was registered successfully', 'User registered!')
        this.router.navigate(['/login'])
      })
      .catch((err) => {
        this.loading = false
        this.toastr.error(this.errorHandler.errorMessage(err.code), 'Error')
        console.log(err.code)
      })
  }

  showPassword() {
    if (this.type === 'password') {
      this.type = 'text'
    } else {
      this.type = 'password'
    }
  }

  verifyPassword() {
    const formCurrentValue = this.signupForm.getRawValue()

    this.authService.validatePassword(formCurrentValue.password)
      .then((res) => {
        this.validPassword = res.isValid
      })
      .catch(err => console.log(err))
  }
}