import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth)
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const user = auth.currentUser
  if (!user) {
    router.navigate(['/login'])
  }

  const tokenResult = await user?.getIdTokenResult()
  const role = tokenResult?.claims['role']

  if (role === 'admin') {
    return true
  }

  toastr.error('No tienes permiso para acceder a esta página.', 'Acceso Denegado');
  router.navigate(['/home']);
  return false;
};
