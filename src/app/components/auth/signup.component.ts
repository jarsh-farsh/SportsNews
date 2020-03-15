import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilities } from 'src/app/utils/utils';
import { EmailMatchValidator, PasswordMatchValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  firstNameFocus: boolean;
  lastNameFocus: boolean;
  emailFocus: boolean;
  emailConfirm: boolean;
  password: boolean;
  passwordConfirm: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern(Utilities.getEmailPattern())]],
        emailConfirm: ['', [Validators.required]]
      }, { validator: EmailMatchValidator }),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(7)]],
        passwordConfirm: ['', [Validators.required]]
      }, {validator: PasswordMatchValidator })

    })

  }

}
