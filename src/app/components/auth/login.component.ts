import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/data/auth.service';
import { GlobalMessageService } from 'src/app/Services/layout/global-message.service';
import { Utilities } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/Services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  usernameFocus:boolean = false;
  passwordFocus:boolean = false;

  errorMessage: string = "";

  get isLoggedIn(): boolean {
    return this.authService.currentUser !== null;
  }

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private gmService: GlobalMessageService,
              private routeService: RouteService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Utilities.getEmailPattern())]],
      password: ['', [Validators.required]]
    })

  }

  login(): void{
    var response = this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);

    response.subscribe({
      next: res => {
        if(res['error'] === true){
          this.errorMessage = res['message'];
          this.showValidationMessage();
        }else{
          this.gmService.addMessage(`Welcome ${res['data']['firstName']}`, "info");
          this.router.navigateByUrl(this.routeService.getPreviousRoute());
        }
      },
      error: err => {
        console.log(err);
      }
    })

  }

  logout(){
    this.authService.logout();
  }

  navToHome(){
    this.router.navigate(['/']);
  }

  showValidationMessage(){
    window.scrollTo(0, 0);
  }
}
