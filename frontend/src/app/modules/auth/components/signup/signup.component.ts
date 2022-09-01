import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@etp/auth/services';
import { User } from '@etp/shared/interfaces';
import { UserServiceService } from '@etp/shared/services';

@Component({
  selector: 'etp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUser = {
    name: '',
    email: '',
    password: ''
  };
  
  signUpForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.pattern(''), Validators.minLength(8)]}),
    repeatpassword: new FormControl('', {validators: [Validators.required]}),
  }, {validators: passwordsValidator})

  error: String = '';

  @ViewChild("passwordInput") passwordInput!: ElementRef;
  @ViewChild("reppasswordInput") reppasswordInput!: ElementRef;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserServiceService,
    ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  signUp(){    
    if (this.signUpForm.status === 'VALID') {
      this.newUser = {
        name: this.signUpForm.controls.name.value || '',
        email: this.signUpForm.controls.email.value || '',
        password: this.signUpForm.controls.password.value || ''
      }

      this.authService.signUp(this.newUser.name, this.newUser.email, this.newUser.password, )
        .subscribe({
          next: res => {
          if (res.status === 201) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          }       
          },
          error: ((err) => {
            this.error = '';
            this.signUpForm.controls.password.reset();
            this.signUpForm.controls.repeatpassword.reset();
            this.error = err.error.msg 
          })
        })
    }
  }

  showPassword(value: number){
    if (value === 1) {
      if (this.passwordInput.nativeElement.type === 'password') {
        this.passwordInput.nativeElement.type = 'text'
      } else {
        this.passwordInput.nativeElement.type = 'password'
      }
    } else {
      if (this.reppasswordInput.nativeElement.type === 'password') {
        this.reppasswordInput.nativeElement.type = 'text'
      } else {
        this.reppasswordInput.nativeElement.type = 'password'
      }
    }
  }

  get f() { return this.signUpForm }
  get name() { return this.signUpForm.controls.name }
  get email() { return this.signUpForm.controls.email }
  get password() { return this.signUpForm.controls.password }
}

export const passwordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatpassword');

  return password && repeatPassword && password.value !== repeatPassword.value 
    ? { passDoesntMatch: true } 
    : null;
};