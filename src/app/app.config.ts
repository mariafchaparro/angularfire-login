import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideToastr } from 'ngx-toastr';

const firebaseConfig = {
  apiKey: "AIzaSyDFLbchq2-yRIfUGI-eliCj2pdMl7l6KmQ",
  authDomain: "angularfire-auth-88896.firebaseapp.com",
  projectId: "angularfire-auth-88896",
  storageBucket: "angularfire-auth-88896.firebasestorage.app",
  messagingSenderId: "522646551838",
  appId: "1:522646551838:web:54477fe53c58ba6d6a1d0f"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideToastr({
      timeOut: 4000,
      preventDuplicates: true,
    })
  ]
};