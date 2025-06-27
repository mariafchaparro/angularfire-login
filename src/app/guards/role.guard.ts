import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getIdTokenResult, User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  // Wait for firebase to load the user
  const user = await new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // Force the user to refresh the token to get the latest claims
  await user.getIdToken(true);
  const tokenResult = await getIdTokenResult(user);
  const role = (tokenResult.claims as any).role;

  if (role === 'admin') {
    return true;
  }

  toastr.error('No tienes permiso para acceder');
  router.navigate(['/home']);
  return false;
};