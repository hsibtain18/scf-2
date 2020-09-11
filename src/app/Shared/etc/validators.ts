import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function RegexValidator(reg: any): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && !control.value.toString().match(reg)) {
      return { decimal: true };
    }
    return null;
  };

}


export function MinNumberValidation(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value < 0) {
      return { decimal: true };
    }
    return null;
  };

}