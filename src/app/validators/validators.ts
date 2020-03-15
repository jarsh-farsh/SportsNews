import { AbstractControl } from '@angular/forms';


export function EmailMatchValidator(c: AbstractControl): any {
    const email = c.get('email');
    const emailConfirm = c.get('emailConfirm');

    if(email.pristine || emailConfirm.pristine) return null;
    
    if(email.value === emailConfirm.value) return null;

    return { 'match': true }
}

export function PasswordMatchValidator(c: AbstractControl): any{
    const password = c.get('password');
    const passwordConfirm = c.get('passwordConfirm');

    if(password.pristine || passwordConfirm.pristine) return null;
    
    if(password.value === passwordConfirm.value) return null;

    return { 'match': true }
}