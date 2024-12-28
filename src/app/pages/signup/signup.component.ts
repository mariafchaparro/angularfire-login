import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { errorMessage } from '../../utils/error-handler';
import { Auth, createUserWithEmailAndPassword,validatePassword } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  auth = inject(Auth)
  router = inject(Router)
  toastr = inject(ToastrService)

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

    createUserWithEmailAndPassword(this.auth, formValue.email, formValue.password)
      .then(() => {
        this.toastr.success('The user was registered successfully', 'User registered!')
        this.router.navigate(['/login'])
      })
      .catch((err) => {
        this.loading = false
        this.toastr.error(errorMessage(err.code), 'Error')
      })
  }

  showPassword() {
    this.type = this.type === 'password' ? 'text' : 'password'
  }

  verifyPassword() {
    const formCurrentValue = this.signupForm.getRawValue()

    validatePassword(this.auth, formCurrentValue.password)
      .then((res) => {
        this.validPassword = res.isValid
      })
      .catch(err => console.log(err))
  }
}
