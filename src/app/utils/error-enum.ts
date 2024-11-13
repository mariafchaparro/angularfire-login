// Firebase error types
export enum CodeErrorEnum {
    EmailAlreadyUsed = 'auth/email-already-in-use',
    InvalidEmail = 'auth/invalid-email',
    WeakPassword = 'auth/weak-password',
    IncorrectData = 'auth/invalid-credential'
}


/**
 * Error codes where obtained on
 *  https://firebase.google.com/docs/auth/admin/errors
 */
