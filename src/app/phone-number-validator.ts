import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[phoneValidateDirective]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AppPhoneValidateDirective,
    multi: true
  }]
})
export class AppPhoneValidateDirective implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
      console.log('from phone validator');
    if (control.value && (control.value.toString().length !== 7 && 
                            control.value.toString().length !== 10)) {
      return { 'phoneNumberInvalid': true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
}