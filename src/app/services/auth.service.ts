import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, validatePassword} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    auth = inject(Auth)

    register(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password)
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password)
    }

    logout() {
        return signOut(this.auth)
    }

    recoverPassword(email: string) {
        return sendPasswordResetEmail(this.auth, email)
    }
    
    validatePassword(password: string) {
        return validatePassword(this.auth, password)
    }
}
