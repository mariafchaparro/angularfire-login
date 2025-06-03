import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { errorMessage } from '../../utils/error-handler';
import { Auth, createUserWithEmailAndPassword,getIdToken,idToken,validatePassword } from '@angular/fire/auth';
import { get } from '@angular/fire/database';

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
      .then(async (res) => {
        const user = res.user
        const token = await getIdToken(user)

        // Call the backend to assign the default role
        const resBack = await fetch('https://angularfire-backend-roles.onrender.com/assign-default-role', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken: token,
          }), 
        });

        const data = await resBack.json();
        console.log(data);
  
        // Refresh token to get the new claims
        await user.getIdToken(true);

        // Get the role
        const tokenResult = await user.getIdTokenResult()
        const role = tokenResult.claims['role']

        console.log('new role', role);

        this.toastr.success('The user was registered successfully', 'User registered!')
        this.router.navigate(['/home'])
      })
      .catch((err) => {
        this.loading = false
        this.toastr.error(errorMessage(err.message), 'Error')
        console.log(err);
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
