export function errorMessage(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already used'
      case 'auth/invalid-email':
        return 'Invalid Email'
      case 'auth/weak-password':
        return "Weak password"
      case 'auth/invalid-credential':
        return 'Incorrect data'
      case 'auth/password-does-not-meet-requirements':
        return "Password doesn't meet the requirements"
      default:
        return code
    }
  }
/**
 * Error codes where obtained from
 *  https://firebase.google.com/docs/auth/admin/errors
 */
