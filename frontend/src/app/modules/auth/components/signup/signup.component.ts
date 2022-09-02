import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Services
import { AuthService } from '@etp/auth/services';
// Components
import { ModalMsgComponent } from '@etp/dashboard/components';

@Component({
  selector: 'etp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Vars
  newUser = {
    name: '',
    email: '',
    password: ''
  };
  inputTypeValue: string = "password"
  error: String = '';
  
  // Form
  signUpForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]}),
    repeatpassword: new FormControl('', {validators: [Validators.required]}),
  }, {validators: passwordsValidator})
  get f() { return this.signUpForm }
  get name() { return this.signUpForm.controls.name }
  get email() { return this.signUpForm.controls.email }
  get password() { return this.signUpForm.controls.password }
  get repPassword() { return this.signUpForm.controls.repeatpassword }
  
  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
    ) { }

    // If logged, redirect to feed
  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  // ########################## Functionalities
  // ########################## Functionalities
  // ########################## Functionalities
  signUp(){    
    if (this.signUpForm.status === 'VALID' && this.name.value && this.email.value && this.password.value ) {
      this.newUser = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
      }
      // Sign up --> BE
      this.authService.signUp(this.newUser.name, this.newUser.email, this.newUser.password, )
        .subscribe({
          next: res => {
            if (res.status === 200) {
              this.openDialog('We sent you a verification email, please check it. This will allows you to login.')
            } else{
              this.error = res.msg
            }
          },
          error: ((err) => {
            this.signUpForm.controls.password.reset();
            this.signUpForm.controls.repeatpassword.reset();
            this.error = 'Something went wrong. Try Again' 
          })
        })
    }
  }
  
  // Show dialog with message
  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {data: { msg }})
    .afterClosed()
      .subscribe({
        next: next => {
          window.location.reload();
        },
        error: (err) => {
          window.location.reload();}
      });
  }

  // Show or hide password functionality
  showPassword(){
    if (this.inputTypeValue === 'password') {
      this.inputTypeValue = 'text'
    } else {
      this.inputTypeValue = 'password'
    }
  }
}

const passwordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatpassword');

  return password && repeatPassword && password.value !== repeatPassword.value 
    ? { passDoesntMatch: true } 
    : null;
};