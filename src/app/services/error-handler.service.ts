import { Injectable } from '@angular/core';
import { CodeErrorEnum } from '../utils/error-enum';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  errorMessage(code: string) {
    switch (code) {
      case CodeErrorEnum.EmailAlreadyUsed :
        return 'This email is already used'
      case CodeErrorEnum.InvalidEmail:
        return 'Invalid Email'
      case CodeErrorEnum.WeakPassword:
        return "Weak password"
      case CodeErrorEnum.IncorrectData:
        return 'Incorrect data'
      case CodeErrorEnum.InvalidPassword:
        return "Password doesn't meet the requirements"
      default:
        return code
    }
  }
}
