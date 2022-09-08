import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Services
import { AuthService } from '@etp/auth/services';
import { ModalMsgComponent } from '@etp/shared/components';
import { UserServiceService } from '@etp/shared/services';
// Components

@Component({
  selector: 'etp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Variables
  error: string = '';
  inputTypeValue: string = "password"

  // Form
  logInForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]}),
  })
  get email() { return this.logInForm.controls.email }
  get password() { return this.logInForm.controls.password }
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  // ########################## Functionalities
  // ########################## Functionalities
  // ########################## Functionalities

  // User try to log in
  logIn(){
    if (this.logInForm.status === 'VALID' && this.email.value && this.password.value ) {
      // LigIn --> BE
      this.authService.logIn(this.email.value, this.password.value)
      .subscribe({
        next: (res) => {
          // Set Token
          localStorage.setItem('token', res.token);
          // Get user data --> BE
          this.authService.getLoggedUser().subscribe({
            next: (response) => {
              this.userService.updateUser(response.user);
            },
            error: ((err) => {
              this.router.navigate(['/dashboard'])
            }) 
          })            
          this.router.navigate(['/dashboard']);
        },
        error: ((err) => {
          this.logInForm.controls.password.reset();
            this.error = err.error.msg
            console.log(this.error);
          })
        })
    }
  }

  // Show or hide password functionality
  showPassword(){
    if (this.inputTypeValue === 'password') {
      this.inputTypeValue = 'text'
    } else {
      this.inputTypeValue = 'password'
    }
  }

  // User forgo Password functionality
  forgotPass(){
    if (this.email.value && this.email.valid) {
      this.userService.forgotPassword(this.email.value)
        .subscribe({
          next: (res) => { this.dialog.open(ModalMsgComponent, { data: { msg: `Te enviamos un mail a ${this.email.value} con pasos para reiniciar tu contraseña.` } })},
          error: ((err) => { this.error = err.error.msg })
        })
    } else {
      this.error = 'Por favor, previamente ingrese un email.'
    }
  }
  
}
