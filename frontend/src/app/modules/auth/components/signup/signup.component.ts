import { Component, OnInit } from '@angular/core';
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
  error: string = '';
  spinner: boolean = false
  
  // Form
  signUpForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.maxLength(100)]}),
    password: new FormControl('', {validators: [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'), Validators.maxLength(255)]}),
    repeatpassword: new FormControl('', {validators: [Validators.required, Validators.maxLength(255)]}),
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
      this.spinner = true;
      this.authService.signUp(this.newUser.name, this.newUser.email, this.newUser.password)
        .subscribe({
          next: res => {
            this.spinner = false;
            this.openDialog('We sent you a verification email, please check it. This will allows you to login.')
          },
          error: ((err) => {
            this.spinner = false;
            this.signUpForm.controls.password.reset();
            this.signUpForm.controls.repeatpassword.reset();
            this.error = err.error.msg  
          })
        })
    }
  }
  
  // Show dialog with message
  openDialog(msg: string) {
    this.dialog.open(ModalMsgComponent, {data: { msg }})
    .afterClosed()
      .subscribe(_ => { window.location.reload()})
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