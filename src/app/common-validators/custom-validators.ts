import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {

  static noSpecialCharacters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (!control.value) {
        return null;
      }

      const regex = /^[a-zA-Z\s]+$/;

      return regex.test(control.value)
        ? null
        : { specialCharacter: true };
    };
  }
  
}