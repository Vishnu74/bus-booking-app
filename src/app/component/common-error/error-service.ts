import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  
  getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    const label = this.formatLabel(controlName);

    if (errors['required']) return `${label} is required`;
    if (errors['minlength']) return `${label} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `${label} must be at most ${errors['maxlength'].requiredLength} characters`;
    if (errors['specialCharacter']) return `${label} cannot contain special characters`;
    if (errors['email']) return `Please enter a valid email address`;
    
    return 'Invalid input';
  }

  private formatLabel(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}