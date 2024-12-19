// Firebase error types
export enum CodeErrorEnum {
    EmailAlreadyUsed = 'auth/email-already-in-use',
    InvalidEmail = 'auth/invalid-email',
    WeakPassword = 'auth/weak-password',
    IncorrectData = 'auth/invalid-credential',
    InvalidPassword = 'auth/password-does-not-meet-requirements'
}


/**
 * Error codes where obtained from
 *  https://firebase.google.com/docs/auth/admin/errors
 */
